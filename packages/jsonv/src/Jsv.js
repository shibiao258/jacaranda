import config from './config';
import validate from './validators';
import transform from './transformers';

/**
 * JSON Validation Syntax
 * @class
 */
class JSV {
    static config = config;
    static match = (value, jsv, options, context) => {
        const reason = validate(
            value,
            jsv,
            {
                throwError: false,
                abortEarly: true,
                plainError: true,
                ...options,
            },
            { config: this.config, transform, ...context }
        );
        if (reason === true) {
            return [true];
        }

        return [false, reason];
    };

    /**
     * @param {object} value
     */
    constructor(value) {
        this.value = value;
    }

    /**
     * Match the value with expected conditions in JSON expression
     * @param {object} expected - JSON match expression
     * @throws ValidationError
     * @returns {JSV}
     */
    match(expected) {
        validate(
            this.value,
            expected,
            { throwError: true, abortEarly: true },
            { config: this.constructor.config, transform }
        );
        return this;
    }
}

export default JSV;