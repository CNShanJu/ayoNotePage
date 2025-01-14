# 理解Nginx的proxy_pass和url路径转换

思考以下两个nginx配置块：

```nginx
location / {
    proxy_pass http://127.0.0.1:8080;
}
```

```nginx
location / {
    proxy_pass http://127.0.0.1:8080/;
}
```

它们的代理规则其实是一样的，当请求的url为`/abc/def`，都会将请求代理转发到http://127.0.0.1:8080/abc/def

但是在匹配规则为非根路径的`location`块中，比如以下配置：

```nginx
location /app {
    proxy_pass http://127.0.0.1:8080;
}
```

它和下面这个配置所对应的代理规则却不一样：

```nginx
location /app/ {
    proxy_pass http://127.0.0.1:8080/;
}
```

下表列举了`location`和`proxy_pass` url 的不同组合所对应的最终请求路径：

| Case | Nginx location | proxy_pass URL              | Test URL         | Path received         |
| ---- | -------------- | --------------------------- | ---------------- | --------------------- |
| 1    | /test          | http://127.0.0.1:8080       | /test1/abc/test  | /test1/abc/test       |
| 2    | /test2         | http://127.0.0.1:8080/      | /test2/abc/test  | //abc/test            |
| 3    | /test3/        | http://127.0.0.1:8080       | /test3/abc/test  | /test3/abc/test       |
| 4    | /test4/        | http://127.0.0.1:8080/      | /test4/abc/test  | /abc/test             |
| 5    | /test5         | http://127.0.0.1:8080/app1  | /test5/abc/test  | /app1/abc/test        |
| 6    | /test6         | http://127.0.0.1:8080/app1/ | /test6/abc/test  | /app1//abc/test       |
| 7    | /test7/        | http://127.0.0.1:8080/app1  | /test7/abc/test  | /app1abc/test         |
| 8    | /test8/        | http://127.0.0.1:8080/app1/ | /test8/abc/test  | /app1/abc/test        |
| 9    | /              | http://127.0.0.1:8080       | /test9/abc/test  | /test9/abc/test       |
| 10   | /              | http://127.0.0.1:8080/      | /test10/abc/test | /test10/abc/test      |
| 11   | /              | http://127.0.0.1:8080/app1  | /test11/abc/test | /app1test11/abc/test  |
| 12   | /              | http://127.0.0.1:8080/app2/ | /test12/abc/test | /app2/test12/abc/test |

> 结论：在nginx中配置proxy_pass代理转发时，如果在proxy_pass后面的url加/，表示绝对根路径，nginx不会把location中匹配的路径部分代理走，比如case 4；如果没有/，表示相对路径，则会把匹配的路径部分也给代理走，比如case 3

补充：在`location`的匹配规则中，`/test/`和`/test` 有什么区别？

```nginx
# 只会匹配 /test/xxx，不会匹配 /testabc
location /test/ {
  # ...
}

# 可以匹配/test/xxx，也可以匹配/testabc
location /test {
  # ...
}
```

