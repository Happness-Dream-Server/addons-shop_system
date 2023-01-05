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
    try {
        var data = target.getDynamicProperty("goods");
    } catch (error) {
        var data = null;
    }
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
        data = JSON.parse(target.getDynamicProperty("goods"));
        var form = new mcui.ActionFormData()
            .title("購入できる品物")
            .body("購入したい品物を選んでください");
        for (var i = 0; i < data.list.length; i++) {
            form.button(data.list[i].name + "：" + data.list[i].price + "オルク");
        }
        form.button("カートを見る");
        form.button("閉じる");
        if (player.hasTag('cast')) {
            form.button("§eキャスト用の画面を開く");
        }
        form.show(player).then((response) => {
            if (response.selection < data.list.length) {
                addCart(player, target, data.list[response.selection]);
            } else if (response.selection === (tags.length + 1)) {
                checkCart(player, target);
            } else if (response.selection === (tags.length + 3)) {
                openCast(player, target);
            }
        });
    }
}

//カートに指定されたアイテムを追加して、終わったらカートを表示させる関数を実行
function addCart(player, target, data) {
    //カートに追加するための動作を追加予定
}

//カートを表示して、購入するかまだ探すかを選べる
function checkCart(player, target) {
    //カートを表示、選択によって購入を確定するか、商品選択に戻す
    //（選択したものを消す手段を作るかどうか迷い中）
    //購入時、現金かキャッシュレスかを選べるとなおよし
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