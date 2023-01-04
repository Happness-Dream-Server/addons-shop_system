//初期設定のメモ
//dynamic propertyに金額と品物を記入して保存しておく
//形式はjson形式で、typeに販売タイプ(foods or goods)、listに販売品データ(name,id,priceの3つの要素)

//UIと基本のモジュールをimportする
import * as mc from "@minecraft/server";
import * as mcui from "@minecraft/server-ui";

//ショップのホーム画面のフォームと、その返答を作成
function shopHome(player, target) {
    var data = target.getDynamicProperty("goods");
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
function checkCart(player,target) {

}

//コマンドとして追加する用だが、実装できるかわからないため、とりあえず放置
var scriptOptions = {
    nameSpaces: "test"
}
mc.world.events.scriptEventCommandMessage.subscribe(shopHome);