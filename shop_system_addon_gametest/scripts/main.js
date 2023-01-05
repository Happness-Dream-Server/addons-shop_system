//初期設定のメモ
//tagに金額と品物を記入して保存しておく
//形式はjson形式
/*{
    type:販売タイプ(foods or goods)将来的に使用できるように予約,
    list:販売品データ(name,id,priceの3つの要素)
}*/

//UIと基本のモジュールをimportする
import * as mc from "@minecraft/server";
import * as mcui from "@minecraft/server-ui";

//ショップのホーム画面のフォームと、その返答を作成
function shopHome(player, target) {
    var data = dbGet(target);
    //そのショップが対応してる販売アイテムがあるかを確認
    if (data == null) {
        var form = new mcui.ActionFormData()
            .title("購入できる品物")
            .body("現在、販売している品物はありません！");
        form.button("閉じる");
        if (player.hasTag('cast')) {
            form.button("§eキャスト用の画面を開く");
        }
        form.show(player).then((response) => {
            if (response.selection === 1) {
                openCast(player, target);
            }
        });
    } else {
        var form = new mcui.ActionFormData()
            .title("購入できる品物")
            .body("購入したい品物を選んでください");
        for (var i = 0; i < data.list.length; i++) {
            form.button(data.list[i][0] + "：" + data.list[i][2] + "オルク");
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
    var money = mc.world.scoreboard.getObjective('money').getScore(player.scoreboard);
    if (Number(data[2]) <= money) {
        //販売用の処理
        player.runCommandAsync('scoreboard players remove ' + player.name + ' money ' + Number(data[2]));
        player.runCommandAsync('give ' + player.name + ' ' + data[1]);
        player.tell("購入が正常に完了しました。ご購入いただきありがとうございました。");
    } else {
        player.tell("申し訳ございません。所持金が不足しているようです。");
    }
}

//商品の陳列設定
function openCast(player, target) {
    //商品のリストを表示し、場合によっては削除したり、追加したりできるようにする
    //（shopHomeと半分程同じ動作を行う予定のため、一部を別途関数にすることも検討）
    var form = new mcui.ActionFormData()
        .title("販売設定")
        .body("操作を選択してください")
        .button("品物を追加する")
        .button("閉じる");
    form.show(player).then((response) => {
        if (response.selection === 0) {
            addGoods(player, target);
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
        var data = dbGet(target);
        if (data == null) {
            data = {
                type: "food",
                list: []
            };
        }
        target.removeTag(JSON.stringify(data));
        var list = [response.formValues[0], response.formValues[1], response.formValues[2]];
        data.list.push(list);
        data = JSON.stringify(data);
        target.addTag(data);
        openCast(player, target);
    });
}

function dbGet(target) {
    try {
        var data = target.getTags()[0];
    } catch (error) {
        var data = null;
    }
    if (data == null) {
    } else {
        data = JSON.parse(data);
    }
    return data;
}

function eventGet(event) {
    if (event.hitEntity.typeId == "hds:shop_object") {
        shopHome(event.entity, event.hitEntity);
    }
    return;
}

mc.world.events.entityHit.subscribe(eventGet);