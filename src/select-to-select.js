function oneToOne(config){
    
    window.addEventListener('DOMContentLoaded', main)

    function main(){

        // render primary and sub select 
        const values = getValuesByKey(config.data, getPrimarySelect().getAttribute('data-name'))
        getPrimarySelect().innerHTML = getOptionsByArray(values)
        getSubSelect().innerHTML = getOptionsByArray(config.data[0][getSubSelect().getAttribute('data-name')])

        // handle change primary select
        getPrimarySelect().addEventListener('change', function(e){
            getSubSelect().innerHTML = getOptionsByArray(
                getArrayByEqual(
                    config.data, getPrimarySelect().getAttribute('data-name'), e.target.value, getSubSelect().getAttribute('data-name')
                )
            )
            getSubSelect().getAttribute('data-name')
        }, false)

    }

    function getPrimarySelect(){
        return S('#oneToOneWrap [data-primary="true"]')
    }

    function getSubSelect(){
        return S('#oneToOneWrap select:not([data-primary="true"])')
    }

    function S(selector){
        return document.querySelector(selector)
    }

    function getArrayByEqual(array, key, value, subKey){
        for(let i in array){
            if(array[i][key] === value){
                return array[i][subKey]
                break
            }
        }
    }

    function getValuesByKey(array, key, i){
        const returnArr = []
        for(let i in array){
            returnArr.push(array[i][key])
        }
        return returnArr
    }

    /**
     * params: [value...]
     * return: string 
     */
    function getOptionsByArray(array){
        let options = ''
        for(let i in array){
            options += renderOptionTpl(array[i])
        }
        return options
    }

    function renderOptionTpl(value){
        return `<option value='${value}'>${value}</option>`
    }
}