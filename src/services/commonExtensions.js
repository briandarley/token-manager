import injector from 'vue-inject';
export default function CommonExtensions() {
    return {
        convertToQueryParams(criteria) {

            let params = Object.keys(criteria)

                .filter(c => {

                    if (criteria[c] != null && criteria[c] !== "") {
                        if (Array.isArray(criteria[c]) && criteria[c].length > 0) {
                            return true;
                        }
                        else if (!Array.isArray(criteria[c])) {
                            return true;
                        }
                        return false;
                    }


                })
                .map(c => {
                    if (Array.isArray(criteria[c])) {
                        let query = '';
                        for (let i = 0; i < criteria[c].length; i++) {


                            query += `${c}=${criteria[c][i]}&`
                        }
                        query = query.replace(/&$/, '');
                        return query;
                    }
                    let paramValue = criteria[c];
                    if (criteria[c] && (typeof criteria[c] === 'string')) {
                       paramValue = criteria[c].replace("&", encodeURIComponent('&'));
                    }
                    return `${c}=${paramValue}`
                })

            let response = "";

            for (let i = 0; i < params.length; i++) {
                response += `${params[i]}&`
            }

            response = response.replace(/&$/, "");
            return response;
        }
    }
}
injector.service('CommonExtensions', CommonExtensions)
