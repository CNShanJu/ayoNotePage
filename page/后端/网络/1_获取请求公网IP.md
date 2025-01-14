# SpringBoot 快速获取 IP 地址及归属地

我们在刷抖音、B站的时候看评论的时候，发现会显示网络用户所在地。国内的用户显示的是省份，国外的用户显示是国家。公开显示网络用户所在地可以提醒用户谨慎发言、治理水军、减少冒充当事人等现象。

那么，这个功能是怎么实现的呢？

`Java` 中获取 `IP` 归属地，主要是分为以下两步：

- 通过 `HttpServletRequest` 获取 `Ip`
- 根据 `IP` 查询获取对应的归属地

## HttpServletRequest 获取 IP

写一个工具类封装获取 `IP`

```java
public class IpUtil {

    private static final String UNKNOWN = "unknown";
    private static final String HEADER_FORWARDED = "x-forwarded-for";
    private static final String HEADER_PROXY = "Proxy-Client-IP";
    private static final String HEADER_WL_PROXY = "WL-Proxy-Client-IP";
    private static final String HEADER_HTTP = "HTTP_CLIENT_IP";
    private static final String HEADER_HTTP_FORWARDED = "HTTP_X_FORWARDED_FOR";
    private static final String LOCAL_IP = "127.0.0.1";
    private static final String LOCAL_HOST = "localhost";

    /**
     * 获取 IP 地址
     *
     * @param request
     * @return
     */
    public String getIpAddr(HttpServletRequest request) {
        String ip = request.getHeader(HEADER_FORWARDED);

        if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
            ip = request.getHeader(HEADER_PROXY);
        }

        if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
            ip = request.getHeader(HEADER_WL_PROXY);
        }

        if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
            ip = request.getHeader(HEADER_HTTP);
        }

        if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
            ip = request.getHeader(HEADER_HTTP_FORWARDED);
        }

        if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }

        // 本机访问
        if (LOCAL_IP.equalsIgnoreCase(ip) || LOCAL_HOST.equalsIgnoreCase(ip) || "0:0:0:0:0:0:0:1".equalsIgnoreCase(ip)) {
            // 根据网卡取本机配置的 IP
            try {
                InetAddress localHost = InetAddress.getLocalHost();
                ip = localHost.getHostAddress();
            } catch (UnknownHostException e) {
                e.printStackTrace();
            }
        }

        // 对于通过多个代理的情况，第一个 IP 为客户端真实 IP,多个 IP 按照','分割
        if (ip != null && ip.length() > 15) {
            if (ip.indexOf(",") > 15) {
                ip = ip.substring(0, ip.indexOf(","));
            }
        }

        return ip;
    }
}
```

对这里出现的几个名词解释一下：

-  x-forwarded-for：一个 HTTP 扩展头部，主要是为了让 Web服务器获取访问用户的真实 IP 地址。每个 IP 地址，每个值通过逗号+空格分开，最左边是最原始客户端的 IP 地址，中间如果有多层代理，每⼀层代理会将连接它的客户端 IP 追加在 X-Forwarded-For 右边。
- Proxy-Client-IP：这个一般是经过 Apache http 服务器的请求才会有，用 Apache http 做代理时一般会加上 Proxy-Client-IP 请求头
- WL-Proxy-Client-IP：也是通过 Apache http 服务器，在 weblogic 插件加上的头。

## Ip2region

### 简介

> 一个准确率 99.9%离线 `IP` 数据管理框架和定位库，支持亿级别的数据段，10 微秒级别的查询性能，提供了**java,php,c,python,nodejs,golang,c#** 等查询绑定和Binary，B树，内存三种查询算法。

### Ip2region 内置的三种查询算法

全部的查询客户端单次查询都在 **0.x** 毫秒级别，内置了三种查询算法

- **memory 算法**：整个数据库全部载入内存，单次查询都在0.1x毫秒内，C语言的客户端单次查询在0.00x毫秒级别。
- **binary 算法**：基于二分查找，基于ip2region.db文件，不需要载入内存，单次查询在0.x毫秒级别。
- **b-tree 算法**：基于btree算法，基于ip2region.db文件，不需要载入内存，单词查询在0.x毫秒级别，比binary算法更快。

`Github` 地址：

```awk
https://github.com/lionsoul2014/ip2region
```

`Gitee` 地址：

```awk
https://gitee.com/lionsoul/ip2region
```

### 功能特性

**标准化的数据格式**
每个 IP 数据段的 `region` 信息都固定了格式：`国家|区域|省份|城市|ISP`，只有中国的数据绝大部分精确到了城市，其他国家部分数据只能定位到国家，后前的选项全部是 0。

**数据去重和压缩**
`xdb` 格式生成程序会自动去重和压缩部分数据，默认的全部 `IP` 数据，生成的 `ip2region.xdb` 数据库是 `11MB`，随着数据的详细度增加数据库的大小也慢慢增大。

**极速查询响应**
即使是完全基于 `xdb` 文件的查询，单次查询响应时间在十微秒级别。

**IP 数据管理框架**
`v2.0` 格式的 `xdb` 支持亿级别的 `IP` 数据段行数，`region` 信息也可以完全自定义。例如：可以在 `region` 中追加特定业务需求的数据，例如：`GPS` 信息/国际统一地域信息编码/邮编等。

## 获取 IP 归属地

### 引入依赖

```xml
<dependency>
    <groupId>org.lionsoul</groupId>
    <artifactId>ip2region</artifactId>
    <version>2.6.5</version>
</dependency>
```

### 下载 ip2region.xdb

下载地址：

```awk
https://gitee.com/lionsoul/ip2region/blob/master/data/ip2region.xdb
```

将下载后的 `ip2region.xdb` 文件复制到 `resources/ipdb` 文件夹下

### 编写工具类

```java
public class IpUtil {

    private static Searcher searcher;

    /**
     * 判断是否为合法 IP
     * @return
     */
    public static boolean checkIp(String ipAddress) {
        String ip = "([1-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])(\\.(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])){3}";
        Pattern pattern = Pattern.compile(ip);
        Matcher matcher = pattern.matcher(ipAddress);
        return matcher.matches();
    }

    /**
     * 在服务启动时，将 ip2region 加载到内存中
     */
    @PostConstruct
    private static void initIp2Region() {
        try {
            InputStream inputStream = new ClassPathResource("/ipdb/ip2region.xdb").getInputStream();
            byte[] bytes = FileCopyUtils.copyToByteArray(inputStream);
            searcher = Searcher.newWithBuffer(bytes);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }

    /**
     * 获取 ip 所属地址
     *
     * @param ip ip
     * @return
     */
    public static String getIpRegion(String ip) {

        boolean isIp = checkIp(ip);

        if (isIp) {

            initIp2Region();

            try {
                // searchIpInfo 的数据格式： 国家|区域|省份|城市|ISP
                String searchIpInfo = searcher.search(ip);

                String[] splitIpInfo = searchIpInfo.split("\\|");

                if (splitIpInfo.length > 0) {
                    if ("中国".equals(splitIpInfo[0])) {
                        // 国内属地返回省份
                        return splitIpInfo[2];
                    } else if ("0".equals(splitIpInfo[0])) {
                        if ("内网IP".equals(splitIpInfo[4])) {
                            // 内网 IP
                            return splitIpInfo[4];
                        } else {
                            return "";
                        }
                    } else {
                        // 国外属地返回国家
                        return splitIpInfo[0];
                    }
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
            return "";
        } else {
            throw new IllegalArgumentException("非法的IP地址");
        }

    }

}
```

### 测试

```java
@SpringBootTest
public class IpUtilTest {

    private static final Logger LOGGER = LoggerFactory.getLogger(IpUtilTest.class);

    /**
     * 测试 ip 所属地址
     */
    @Test
    public void testGetIpRegion() {
        String ip = "220.248.12.158"; // IpRegion:上海
//        String ip = "47.52.236.180"; // IpRegion:香港
//        String ip = "172.22.12.123"; // IpRegion:内网IP
//        String ip = "164.114.53.60"; // IpRegion:美国
        String ipRegion = IpUtil.getIpRegion(ip);
        LOGGER.info("IpRegion:{}", ipRegion);
    }
}
```



## 注意

由于我们线上部署是通过**nginx**转发代理的，我们要对**nginx**修改一下配置使其得到客户端真实的 IP

```js
 location / {
		client_max_body_size 200M;
		proxy_connect_timeout 600;
		proxy_read_timeout 600;
 	    proxy_pass  http://127.0.0.1:8088;
 	    #得到客户端真实的 IP
		proxy_set_header Host $host;
       	proxy_set_header X-Real-IP $remote_addr;
       	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;	 
 }
```

