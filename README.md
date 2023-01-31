# shop_system_addonについて
HDSの販売システムに使用する用のアドオンです。  
一般公開版のため、リソースパックのテクスチャ画像やモデル等が実際に使用しているものと異なる場合があります。
# <mark>現在、準備中のため、ダウンロードをしても使用できません。</mark>
# インストール方法
ゲームテスト、ビヘイビア、リソース全てをそれぞれワールドに適用する必要があります。  
まず、本リポジトリの**main**ブランチを開いて、**code**のボタンを押し、**Download ZIP**をおします。  
※**main**ブランチ以外のものは開発中などの可能性があり、ダウンロードしてもエラーが発生して使えない可能性があります。新機能追加時は**main**ブランチを更新します。
ダウンロードしたファイルを解凍し、[shop_system_addon_gametest](shop_system_addon_gametest)フォルダと、[shop_system_addon_behavior](shop_system_addon_behavior)フォルダは中身を含めて、Minecraftのbehaviorフォルダに保存し、[shop_system_addon_resource](shop_system_addon_resource)フォルダはMinecraftのresourceフォルダに保存してください。  
保存が完了したら、Minecraftを起動し、適用したいワールドにbehaviorパックは`ショップ用アドオン`が2つあるはずなので、それを両方適用させ、resourceパックは`ショップ用アドオン`が1つだけあるはずなので、それを適用させてください。
# ワールド内での使用方法
使用するために、  
```scoreboard objectives add money dummy```  
が事前に実行してある必要があります。  
もしその他のスコアボードオブジェクトを使用したい場合はgametestのmain.js内のコードを書き換えて使用してください。  
また、商品データの保存にtagを使用しているため、ショップ用mobには他に何もtagをつけないようにしてください。  
ショップの管理画面を開くためにはプレイヤーに`cast`のタグがついている必要があります。  
