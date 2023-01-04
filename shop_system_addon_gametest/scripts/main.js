//初期設定のメモ
//dunamic propertyに金額と品物を記入して保存しておく
//形式はjson形式で、typeに販売タイプ(foods or goods)、listに販売品データ(name,id,priceの3つの要素)

//UIと基本のモジュールをimportする
import * as mc from "@minecraft/server";
import * as mcui from "@minecraft/server-ui";

//ショップのホーム画面のフォームと、その返答を作成
function shopHome(player, target) {
    var data = JSON.parse(target.getDynamicProperty("goods"));
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
        for (var i = 0; i < goods.length; i++) {
            form.button(goods[i]);
        }
        form.button("カートを見る");
        form.button("閉じる");
        if (player.hasTag('cast')) {
            form.button("§eキャスト用の画面を開く");
        }
        form.show(player).then((response) => {
            if (response.selection < tags.length) {
                addCart(player, target, tags[response.selection]);
            } else if (response.selection === (tags.length + 1)) {
                checkCart(player, target);
            } else if (response.selection === (tags.length + 3)) {
                openCast(player, target);
            }
        });
    }
}

function addCart(player, target, tag) {
    tag = tag.split('：');
}

var scriptOptions = {
    nameSpaces: "test"
}
mc.world.events.scriptEventCommandMessage.subscribe(shopHome);