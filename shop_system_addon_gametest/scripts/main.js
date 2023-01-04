//UIと基本のモジュールをimportする
import * as mc from "@minecraft/server";
import * as mcui from "@minecraft/server-ui";

//ショップのホーム画面のUIを作成
function shopHome(player, target) {
    var form = new mcui.ActionFormData()
        .title("購入できる品物")
        .body("購入したい品物を選んでください");
    var tags = target.getTags();
    for (var i = 0; i < tags.length; i++) {
        form.button(tags[i]);
    }
    form.button("カートを見る");
    form.button("閉じる");
    if (player.hasTag('cast')) {
        form.button("§eキャスト用の画面を開く");
    }
    form.show(player).then((response) => {
        if (response.selection < tags.length) {
            addCart(player,target);
        } else if (response.selection === (tags.length + 1)) {
            checkCart(player,target);
        } else if (response.selection === (tags.length + 3)) {
            openCast(player,target);
        }
    });
}

var scriptOptions = {
    nameSpaces: "test"
}
mc.world.events.scriptEventCommandMessage.subscribe(shopHome);