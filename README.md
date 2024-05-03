# shop_system_addonについて
HDSの販売システムに使用しているアドオンと同様のものです。  
# <mark>現在、準備中のため、ダウンロードをしても使用できません。</mark>
# インストール方法
ゲームテスト、ビヘイビア、リソース全てをそれぞれワールドに適用する必要があります。  
まず、本リポジトリの**Releases**を開いて、最新バージョンのものを押して、zipでダウンロードしてください。  
**Releases**以外のものは開発中などの可能性があり、ダウンロードしてもエラーが発生して使えない可能性があります。新機能追加時は**Releases**を作成します。  
ダウンロードしたファイルを解凍し、[shop_system_addon_behavior](shop_system_addon_behavior)フォルダは中身を含めて、Minecraftのbehaviorフォルダに保存し、[shop_system_addon_resource](shop_system_addon_resource)フォルダはMinecraftのresourceフォルダに保存してください。  
保存が完了したら、Minecraftを起動し、適用したいワールドにbehaviorパックとresourceパックのそれぞれ`ショップ用アドオン`が1つだけあるはずなので、それを両方とも適用させてください。
# ワールド内での使用方法
使用するために、  
```scoreboard objectives add money dummy```  
が事前に実行してある必要があります。  
もしその他のスコアボードオブジェクトを使用したい場合はgametestのmain.js内のコードを書き換えて使用してください。  
ショップの管理画面を開くためにはプレイヤーに`cast`のタグがついている必要があります。  
