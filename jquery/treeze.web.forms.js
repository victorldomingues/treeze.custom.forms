/**
 * Created by Victor Luiz on 30-May-16.
 */

(function($) {

    var e;

    var treezeCustomForms = {
        get: function(url) {
            var options = requests.sync(url);
            options = JSON.parse(options);
            form.create(options);
        },
        options : function(options) {
            form.create(options);
        }
    };

    var requests = {
        sync: function (url){
            var request = $.ajax(
                {
                    type:'GET',
                    url: url,
                    async: false
                }
            );
            return request.responseText;
        }
    };

    var form = {
        create: function (options){
            console.log(options);
            var h = ""; var sections = options.sections;
            console.log(sections.length);
            if(options.completeForm == true){
                h += '<form class="col-md-12">';
                for(var i = 0; i < sections.length ; i++){
                    var section = sections[i];
                    h += '<h2>' + section.name + '</h2><div style="clear: both" /> ';
                    var fields = section.fields;
                    h += '<div class="row">'; 
                    for(var j = 0; j < fields.length ; j++){
                        var f = fields[j];
                        h += form.actions.resolveType(f);
                    }
                    h += '</div>';
                };

                h += '<div class="col-md-12 col-sm-12 col-xs-12">';
                if(options.buttons.submit)
                    h += form.buttons.submit(options.buttons.submit);
                if(options.buttons.reset)
                    h += form.buttons.reset(options.buttons.reset);

                h += '</div>';

                h += '</form>';
            }else{
                for(var i = 0; i < sections.length ; i++){
                    var section = sections[i];
                    var fields = section.fields;
                    h += '<h2>' + section.name + '</h2><div style="clear: both" /> ';
                    h += '<div class="row">';
                    for(var j = 0; j < fields.length ; j++){
                        var f = fields[j];
                        h += form.actions.resolveType(f);
                    }
                    h += '</div>';
                };
            }
            e.html(h);
        },
        fields: {
            text: function (field){
                return '<div class="form-group ' + field.size +'">' +
                            '<label for="' + field.for + '"> ' + field.label  + ' </label>' +
                            '<input type="text" name="' + field.name +'" class="form-control ' + form.actions.getClass(field.class) + ' " id="' + field.id +'" placeholder="'+ field.placeholder +'" ' + form.actions.includeNgModel(field) + ' />' +
                        '</div>' +  form.actions.resolveClear(field.clear);
            },
            number:function(field){
                return '<div class="form-group ' + field.size +'">' +
                            '<label for="' + field.for + '"> ' + field.label  + ' </label>' +
                            '<input type="number" name="' + field.name +'" class="form-control ' + form.actions.getClass(field.class) + ' " id="' + field.id +'" placeholder="'+ field.placeholder +'" ' + form.actions.includeNgModel(field) + '>' +
                    '</div>'  +  form.actions.resolveClear(field.clear);
            },
            checkbox: function(field){
                return '<div class="form-group ' + field.size +'">' +
                            '<div class="checkbox  ' + form.actions.getClass(field.class) + ' ">' +
                                '<label for="'+ field.for +'">'+
                                    '<input type="checkbox" value="'+ field.value +'" ' + (field.disabled ? "disabled" : "")   + ' name="' + field.name +'" ' + form.actions.includeNgModel(field) + ' />'+
                                    field.label +
                                '</label>'+
                            '</div>' +
                        '</div>'  +  form.actions.resolveClear(field.clear);
            },
            radio: function(field){
                var o = '';
                o += '<div class="form-group ' + field.size +'" >' +
                        '<label for="' + field.for + '" > ' + field.label  + ' </label>';
                        if(field.options != undefined && field.options.length > 0){
                            for(var i = 0; i < field.options.length; i ++){
                                var f = field.options[i];
                                o += '<div class="radio ' + form.actions.getClass(field.class) + '">' +
                                        '<label>' +
                                        '   <input type="radio" name="'+ field.name +'" id="'+ field.id +'" value="'+ f.value +'" ' + form.actions.includeNgModel(field) + ' > </input>' +
                                            f.name +
                                        '</label>' +
                                    '</div>';
                            };
                        };
               o += '</div>';

                return o  +  form.actions.resolveClear(field.clear);
            },
            file: function(field){
                return '<div class="form-group ' + field.size +'">' +
                            '<label for="' + field.for + '"> ' + field.label  + ' </label>' +
                            '<input style="padding-bottom: 50px;" type="file" name="' + field.name +'" class="form-control  ' + form.actions.getClass(field.class) + ' " id="' + field.id +'" placeholder="'+ field.placeholder +' ' + form.actions.includeNgModel(field) + ' ">' +
                    '</div>'  +  form.actions.resolveClear(field.clear);
            },
            email: function (field){
                return '<div class="form-group ' + field.size +'">' +
                            '<label for="' + field.for + '"> ' + field.label  + ' </label>' +
                            '<input type="email" name="' + field.name +'" class="form-control ' + form.actions.getClass(field.class) + ' " id="' + field.id +'" placeholder="'+ field.placeholder +' ' + form.actions.includeNgModel(field) + ' ">' +
                    '</div> '  +  form.actions.resolveClear(field.clear)                    ;
            },
            password: function (field){
                return '<div class="form-group ' + field.size +'">' +
                            '<label for="' + field.for + '"> ' + field.label  + ' </label>' +
                            '<input type="password" name="' + field.name +'" class="form-control ' + form.actions.getClass(field.class) + ' " id="' + field.id +'" placeholder="'+ field.placeholder +'" ' + form.actions.includeNgModel(field) + '>' +
                    '</div>'  +  form.actions.resolveClear(field.clear);
            },
            select: function (field){
                var o = '';
                o += '<div class="form-group ' + field.size +'">' +
                    '<label for="' + field.for + '"> ' + field.label  + ' </label>' +
                    '<select class="form-control ' + form.actions.getClass(field.class) + ' " id="' + field.id +'" ' + form.actions.includeNgModel(field) + ' >';
                    if(field.options != undefined && field.options.length > 0){
                        for(var i = 0; i < field.options.length; i ++){
                            var f = field.options[i];
                            o += '<option value="' + f.value +'" ' + (f.selected ? "selected" : "") + '> ' + f.name + '</option>'
                        }
                    };
                    o += '</select>' +
                    '</div>';
                return o  +  form.actions.resolveClear(field.clear);
            },
            textarea: function (field){
                return '<div class="form-group ' + field.size +'">' +
                            '<label for="' + field.for + '"> ' + field.label  + ' </label>' +
                            '<textarea class="form-control ' + form.actions.getClass(field.class) + ' " id="' + field.id +'" placeholder="'+ field.placeholder +'" ' + form.actions.includeNgModel(field) + ' >' +
                            '</textarea>' +
                    '</div>'  +  form.actions.resolveClear(field.clear);
            }
        },
        buttons: {
           reset: function(boolean){
               return ' <button type="submit" class="btn btn-success">Submit</button>';
           },
           submit: function (boolean) {
               return ' <button type="submit" class="btn btn-warning">Reset</button>';
           },
           uploadFiles: function (boolean){
               return '';
           }
        },
        actions: {
            getClass: function (array){
                var i = array.length; var o = '';
                while (i--){
                    o += ' ' + array[i] + ' ';
                };
                return o;
            },
            resolveType: function (field){
                switch(field.type) {
                    case "text":
                        return form.fields.text(field);
                        break;
                    case "password":
                        return form.fields.password(field);
                        break;
                    case "email":
                        return form.fields.email(field);
                        break;
                    case "file":
                        return form.fields.file(field);
                        break;
                    case "number":
                        return form.fields.number(field);
                        break;
                    case "select":
                        return form.fields.select(field);
                        break;
                    case "radio":
                        return form.fields.radio(field);
                        break;
                    case "checkbox":
                        return form.fields.checkbox(field);
                        break;
                    case "textarea":
                        return form.fields.textarea(field);
                        break;
                    default:
                        console.log('Error: type is not defined or not in text, password, email, file, number, select, radio, checkbox. text type was set as the default');
                        return form.fields.text(field)
                }
            },
            includeNgModel: function(field){
                var ngModel  =  '';
                if (field.ngModel != undefined)
                    ngModel = 'ng-model="' + field.ngModel + '"';
                return ngModel;
            },
            resolveClear: function (clear) {
                var t = '';
                if(clear != undefined && clear == 'both')
                    t = '<div style="clear: both;" />';
                return t;
            }
        }

    };

    $.fn.treezeForm = function(methodOrOptions) {
        e = $(this);
        if (treezeCustomForms[methodOrOptions] ) {
            return treezeCustomForms[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            return treezeCustomForms.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on Treeze Custom Forms' );
        }
    };

}(jQuery));