import { ValidationError } from './errors';

class T_BIGINT {
    name = 'bigint';
    alias = ['biginteger'];
    primitive = true;
    scalar = true;
    defaultValue = 0n;

    constructor(system) {
        this.system = system;
    }

    validate(value) {
        return typeof value === 'bigint';
    }

    _sanitize(value, meta, opts) {
        try {
            value = BigInt(value);
        } catch (e) {
            throw new ValidationError('Invalid bigint value. ' + e.message, {
                value: opts.rawValue,
                path: opts.path,
            });
        }

        return value;
    }

    serialize(value) {
        return value == null
            ? null
            : this.system.plugins.bigintWriter
            ? this.system.plugins.bigintWriter(value)
            : value.toString();
    }
}

export default T_BIGINT;
