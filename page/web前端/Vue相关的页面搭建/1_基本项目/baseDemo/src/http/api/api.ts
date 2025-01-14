import { Get, Post, Put, Patch, Delete } from '@/http/conf';

export default {
    //api调用
    getListData: (params) => {
        return Post('/TargetServic', {
            params: {
                ac: 'type',
                tab: 'vod',
                vodtype: '1,2',
            },
            data: params,
        });
    },
};
