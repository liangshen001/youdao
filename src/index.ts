import axios, {AxiosResponse} from "axios";
import crypto from 'crypto';


export default class Youdao {

    constructor(private option: {
        appKey: string;
        appSecret: string;
    }) {
    }

    async translate(query: string, option?: {
        from: string;
        to: string;
        vocabId?: number;
    }) {
        const salt = new Date().getTime();
        const curtime = Math.round(new Date().getTime() / 1000);
        const str1 = this.option.appKey + Youdao.truncate(query) + salt + curtime + this.option.appSecret;
        const sign = crypto.createHash('sha256')
            .update(str1)
            .digest('hex');
        const res = await axios.get<YoudaoTranslateResult, AxiosResponse<YoudaoTranslateResult>>(
            'https://openapi.youdao.com/api', {
            params: {
                q: query,
                appKey: this.option.appKey,
                salt: salt,
                from: option?.from || 'auto',
                to: option?.to || 'auto',
                sign,
                signType: "v3",
                curtime,
                vocabId: option?.vocabId,
            }
        })
        if (res.status === 200) {
            return res.data;
        }
        return Promise.reject(new YoudaoError('1', 'getInfo response Error', res));
    }

    private static truncate(q: string) {
        var len = q.length;
        if (len <= 20) return q;
        return q.substring(0, 10) + len + q.substring(len - 10, len);
    }
}

export class YoudaoError extends Error {
    constructor(public code: string,
                message: string,
                public response?: AxiosResponse) {
        super(message); // (1)
        this.name = "YoudaoError"; // (2)
    }
}

export type YoudaoTranslateResult = {
    returnPhrase: string[];
    query: string;
    errorCode: '0';
    l: string;
    tSpeakUrl: string;
    web?: {
        value: string[],
        key: string;
    }[];
    requestId: string;
    translation: string[];
    dict: {
        url: string;
    };
    webdict: {
        url: string;
    };
    basic?: {
        phonetic: string;
        'us-phonetic': string;
        'uk-phonetic': string;
        explains: string[];
    };
    isWord: boolean;
    speakUrl: string;
}

