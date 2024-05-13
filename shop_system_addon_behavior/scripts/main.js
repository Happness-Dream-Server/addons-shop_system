//初期設定のメモ
//dynamicPropertiesに金額と品物を記入して保存しておく
//形式はjson形式
/*{
    type: string[foods,goods,both],//商品タイプ（セリフを切り替える時用）
    list: list = [[商品名,アイテムID,金額],…]//商品情報をさらに配列にしまって保存
}*/

//UIと基本のモジュールをimportする
import * as mc from "@minecraft/server";
import * as mcui from "@minecraft/server-ui";

//ショップのホーム画面のフォームと、その返答を作成
function shopHome(player, target) {
    //データを取得する
    var data = dbGet(target);
    //フォームを変数に保存
    var form = new mcui.ActionFormData()
        .title("購入できる品物");
    //そのショップが対応してる販売アイテムがあるかを確認
    if (!data) {//一度も登録がされていない場合
        form.body("現在、販売している品物はありません")
            .button("閉じる");
        if (player.hasTag('cast')) {
            form.button("§eキャスト用の画面を開く");
        }
        form.show(player).then((response) => {
            if (response.selection === 1) {
                openCast(player, target);
            }
        });
    } else if (data.list.length == 0) {//一度登録されているが、削除された場合
        form.body("現在販売している品物はありません")
            .button("閉じる");
        if (player.hasTag('cast')) {
            form.button("§eキャスト用の画面を開く");
        }
        form.show(player).then((response) => {
            if (response.selection === 1) {
                openCast(player, target);
            }
        });
    } else {//商品が登録されている場合
        form.body("購入したい品物を選んでください");
        for (var i = 0; i < data.list.length; i++) {
            form.button(data.list[i][0] + "：" + data.list[i][2] + "ハピドル");
        }
        form.button("閉じる");
        if (player.hasTag('cast')) {
            form.button("§eキャスト用の画面を開く");
        }
        form.show(player).then((response) => {
            if (response.selection < data.list.length) {
                buy(player, target, data.list[response.selection]);
            } else if (response.selection === (data.list.length + 1)) {
                openCast(player, target);
            }
        });
    }
}

//指定されたアイテムを購入
function buy(player, target, data) {
    //moneyのスコアボードに必要な金額があるかを確認
    var money = mc.world.scoreboard.getObjective('money').getScore(player.scoreboardIdentity);
    if (Number(data[2]) <= money) {
        //販売用の処理
        target.runCommandAsync('scoreboard players remove ' + player.name + ' money ' + Number(data[2]));
        target.runCommandAsync('give ' + player.name + ' ' + data[1]);
        player.sendMessage("購入が正常に完了しました。ご購入いただきありがとうございました。");
    } else {
        player.sendMessage("申し訳ございません。所持金が不足しているようです。");
    }
    player.sendMessage("現在の所持金：" + money + "ハピドル");
}

//商品の陳列設定
function openCast(player, target) {
    var form = new mcui.ActionFormData()
        .title("販売設定")
        .body("操作を選択してください")
        .button("品物を追加する")
        .button("品物を削除する")
        .button("このショップを消す")
        .button("閉じる");
    form.show(player).then((response) => {
        if (response.selection === 0) {
            addGoods(player, target);
        } else if (response.selection === 1) {
            removeGoods(player, target);
        } else if (response.selection === 2) {
            target.kill();
        }
    });
}

//商品追加
function addGoods(player, target) {
    var form = new mcui.ModalFormData()
        .title("追加内容")
        .textField("商品名", "名前です")
        .textField("アイテムID", "hds:?")
        .textField("金額", "0");
    form.show(player).then((response) => {
        if (response.formValues[0] && response.formValues[1] && response.formValues[2]) {
            var data = dbGet(target);
            if (data == null) {
                data = {
                    type: "both",
                    list: []
                };
            }
            var list = [response.formValues[0], response.formValues[1], response.formValues[2]];
            data.list.push(list);
            data = JSON.stringify(data);
            target.setDynamicProperty('hds_shop_data', data);
            openCast(player, target);
        } else {
            player.sendMessage('未記入の項目があり、追加できませんでした。');
        }
    });
}

function removeGoods(player, target) {
    var form = new mcui.ActionFormData()
        .title("品物を削除");
    var data = dbGet(target);
    if (data == null) {
        form.body("削除できる品物がありません")
            .button("閉じる");
        form.show(player).then((response) => {
        });
    } else if (data.list.length == 0) {
        form.body("削除できる品物がありません")
            .button("閉じる");
        form.show(player).then((response) => {
        });
    } else {
        form.body("削除したい品物を選んでください");
        for (var i = 0; i < data.list.length; i++) {
            form.button(data.list[i][0] + "：" + data.list[i][2] + "ハピドル");
        }
        form.button("閉じる");
        form.show(player).then((response) => {
            if (response.selection < data.list.length) {
                target.removeTag(JSON.stringify(data));
                data.list = data.list.slice(0, (response.selection - 1)).concat(data.list.slice((response.selection + 1), (data.list.length - 1)));
                data = JSON.stringify(data);
                target.setDynamicProperty('hds_shop_data', data);
                openCast(player, target);
            }
        });
    }
}

function dbGet(target) {
    try {
        var data = target.getDynamicProperty('hds_shop_data');
    } catch (error) {
        var data = null;
    }
    if (data) {
        data = JSON.parse(data);
    }
    return data;
}

function eventGet(event) {
    if (event.hitEntity && event.hitEntity.typeId == "hds:shop_object") {
        shopHome(event.damagingEntity, event.hitEntity);
    }
    return;
}

mc.world.afterEvents.entityHitEntity.subscribe(eventGet);