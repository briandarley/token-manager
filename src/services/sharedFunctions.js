import injector from 'vue-inject';
import moment from 'moment';
export default function SharedFunctions() {
    return {
        formatDate(value) {

            if (!value) return "";
            const dt = new Date(value);
            return moment(dt).format("MM/DD/YYYY");

        },
        formatDateTime(value) {

            if (!value) return "";
            return moment(value).format("MM/DD/YYYY h:mm:ss a");

        }
    }
}
injector.service('SharedFunctions', SharedFunctions)
