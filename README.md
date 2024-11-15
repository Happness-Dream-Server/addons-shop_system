# shop_system_addonについて
HDSの販売システムに使用しているアドオンと同様のものです。  
このアドオンは自作発言をしない限り、改変も含めご自由にお使いいただけます。  
このアドオンを使用した場合はぜひ、 #ハピドリ や @hd__server をつけてX（旧Twitter）にて投稿していただけるとキャストの励みになりますので、よろしくお願いします！！（こちらは任意になりますので、投稿していなくてもご利用いただくことは可能です）  
# インストール方法
ゲームテスト、ビヘイビア、リソース全てをそれぞれワールドに適用する必要があります。  
まず、本リポジトリの**Releases**を開いて、最新バージョンのものを押して、zipでダウンロードしてください。  
**Releases**以外のものは開発中などの可能性があり、ダウンロードしてもエラーが発生して使えない可能性があります。新機能追加時は**Releases**を作成します。  
ダウンロードしたファイルを解凍し、[shop_system_addon_behavior](shop_system_addon_behavior)フォルダは中身を含めて、Minecraftのbehaviorフォルダに保存し、[shop_system_addon_resource](shop_system_addon_resource)フォルダはMinecraftのresourceフォルダに保存してください。  
保存が完了したら、Minecraftを起動し、適用したいワールドのbehaviorパックとresourceパックの一覧にそれぞれ`hds_shop_addon`が1つだけあるはずなので、それを両方とも適用させてください。（HDSの管理の都合上あえて依存関係を設定しておりません。どちらか片方だと、表示に問題があったり、使用ができなくなりますので、注意してください。）
# ワールド内での使用方法
使用するために、  
```scoreboard objectives add money dummy```  
が事前に実行してある必要があります。  
もしその他のスコアボードオブジェクトを使用したい場合はgametestのmain.js内のコードを書き換えて使用してください。  
ショップのオブジェクトを設置後、ショップのオブジェクトを長押し、またはクリックで購入画面が表示されます。  
購入画面一番下のボタンから管理画面を開くことができます。  
ショップの管理画面を開くためにはプレイヤーに`cast`のタグがついている必要があります。  
# バグについて
このアドオンは、HDSの販売システムで使用しているため、バグは発見次第その都度調整していきますが、発見された方はX（旧Twitter）のHDS公式アカウント[@hd__server](https://twitter.com/@hd__server)までDMでお知らせください。
