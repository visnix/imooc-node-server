# Node.js 从零开发 web server 博客项目

# 安装mysql 和 redis
```js
`brew install mysql` // [sequel pro 连接的问题](https://stackoverflow.com/questions/51179516/sequel-pro-and-mysql-connection-failed#answer-54227155)
`bew install redis`
```

# 启动mysql和redis
`mysql.server start`
`redis-server`

# 创建数据
```sql
-- 建立数据库
CREATE SCHEMA `myblog`;

-- 建立users表
CREATE TABLE `myblog`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `realname` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`));

-- 创建blogs表
CREATE TABLE `myblog`.`blogs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `createtime` BIGINT(20) NOT NULL DEFAULT 0,
  `author` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`));

-- 使用myblog表
use users;

-- 在users表中插入内容
insert into users (username, `password`, realname) values ('lisi', '123', '李四');

-- 使用myblog表
use myblog;

-- 添加blogs表内容
insert into blogs (title, content, createtime, author) values ('标题A', '内容A', '1599798629348', 'zhangsan');
insert into blogs (title, content, createtime, author) values ('标题B', '内容B', '1599798660472', 'lisi');
```

# 配置nginx代理
```sh
server {
	listen 9340;
	server_name localhost;
        location / {
                proxy_pass http://localhost:9341;
        }
        location /api/ {
                proxy_pass http://localhost:8000;
                proxy_set_header Host $host;
        }
}
```

# 启动页面
`npm start`
`serve -p 9341 .`


> 首先需要建立数据库和表

## mysql 操作
```
mysql.server start

mysql.server stop

mysql.server restart
```

## nginx 操作

代理配置查看 [blog.conf](./html-test/readme.md)
```
nginx : 启动nginx

nginx -s reload  ：修改配置后重新加载生效

nginx -s reopen  ：重新打开日志文件

nginx -t -c /path/to/nginx.conf 测试nginx配置文件是否正确

nginx -s stop  :快速停止nginx

nginx -s quit  ：完整有序的停止nginx
```

## 常用sql语句

```sql
-- 建立数据库
CREATE SCHEMA `myblog`;

-- 建立users表
CREATE TABLE `myblog`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `realname` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`));

-- 创建blogs表
CREATE TABLE `myblog`.`blogs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `createtime` BIGINT(20) NOT NULL DEFAULT 0,
  `author` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`));

-- 使用myblog表
use myblog;

-- 显示所有的表
show tables;

-- 在users表中插入内容
insert into users (username, `password`, realname) values ('lisi', '123', '李四');

-- 查询所有的users表中的数据
select * from users;

-- 按照column查找users表中的内容
select id, username from users;

-- 条件查询
select * from users where username='zhangsan'
select * from users where username='zhangsan' and `password`='123';
select * from users where username='zhangsan' or `password`='123';

-- 模糊查询
select * from users where username like '%zhang%'
select * from users where password like '%1%'

-- 查询后排序
select * from users where password like '%1%' order by id;
select * from users where password like '%1%' order by id desc;

-- 取消限制更改表内容
SET SQL_SAFE_UPDATES = 0;

-- 更改表内容
update users set realname="李四2" where username='lisi';

-- 删除行
delete from users where username="lisi";

-- 添加column
ALTER TABLE `myblog`.`users` 
ADD COLUMN `state` INT NOT NULL DEFAULT 1 AFTER `realname`;


select * from users where state='1';
update users set state='0' where username='lisi';

-- 删除column
ALTER TABLE `myblog`.`users` 
DROP COLUMN `state`;

-- 添加blogs表内容
insert into blogs (title, content, createtime, author) values ('标题A', '内容A', '1599798629348', 'zhangsan');
insert into blogs (title, content, createtime, author) values ('标题B', '内容B', '1599798660472', 'lisi');

-- 查询
select * from blogs;
select * from blogs where title like '%A%' order by createtime desc;
```
