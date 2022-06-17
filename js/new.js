$(function() {
    // 定义时间过滤器
    template.defaults.imports.dateFormat = function(date) {
            function padZero(n) {
                if (n < 10) {
                    return '0' + n;
                } else {
                    return n;
                }
            }
            var dt = new Date(date);
            var y = dt.getFullYear();
            var m = padZero(dt.getMonth() + 1);
            var d = padZero(dt.getDate());
            var h = padZero(dt.getHours());
            var mm = padZero(dt.getMinutes());
            var ss = padZero(dt.getSeconds());
            return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + ss;
        }
        // 获取新闻列表函数
    function getNewList() {
        $.get(
            'http://www.liulongbin.top:3006/api/news',
            function(res) {
                if (res.status !== 200) {
                    return alert("获取新闻列表失败");
                }
                for (let i = 0; i < res.data.length; i++) {
                    // 把tags的内容分隔
                    res.data[i].tags = res.data[i].tags.split(',');
                }
                var htmlStr = template("tpl-news", res);
                $('#news-list').html(htmlStr);
            }
        );
    }
    getNewList();
});
