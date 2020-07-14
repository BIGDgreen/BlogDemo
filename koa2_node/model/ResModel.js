const { isString } = require('../utils/index')
const { CODE_ERROR, CODE_SUCCESS, CODE_NOLOGIN } = require('../utils/constant')

class BaseModel {
    /**
     *Creates an instance of BaseModel.
     * @param {object} data
     * @param {string} msg
     * @memberof BaseModel
     */
    constructor(data, msg) {
        // 兼容只传入一个字符串的情况
        if (isString(data)) {
            this.msg = data;
            data = null;
            msg = null;
        } else if (data === -2) {
            this.state = 'noLogin';
        }
        data && (this.data = data);
        msg && (this.msg = msg);
    }
}

class SuccessModel extends BaseModel {
    /**
     *Creates an instance of SuccessModel.
     * @param {object} data
     * @param {string} msg
     * @memberof SuccessModel
     */
    constructor(data, msg) {
        super(data, msg);
        this.errNo = CODE_SUCCESS;
    }
}

class ErrorModel extends BaseModel {
    /**
     *Creates an instance of ErrorModel.
     * @param {object} data
     * @param {string} msg
     * @memberof ErrorModel
     */
    constructor(data, msg) {
        super(data, msg);
        this.errNo = this.state ? CODE_NOLOGIN : CODE_ERROR;
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}
