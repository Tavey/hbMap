### bin 使用说明

---

*   进入 bin 文件下执行 hooks.sh, 建议使用 root 权限执行。

*   在 git push 的时候会取当前分支自动发布对应 tag 的 npm package
*   安装时可根据 HB-MAP 的分支作为 tag, 进行对应的版本的安装

```
npm install [<@scope>/]<name>@<tag>

例: npm install @huabao/map@cargo
```

*   package 按照 v1.0.0 v1.0.1 依次自动迭代小版本
