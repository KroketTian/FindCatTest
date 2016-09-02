/**
 * Created by KrometTian on 2016/9/2.
 */
function marker(option){
    var me = this;
    this.markerType = option.markerType;
    this.lng = 0;
    this.lat = 0;
    this.content = "";
    this.icon = null;

    this.setmarkerType = function(markerType){
        me.margkerType = markerType;
    };
    this.getmarkerType = function(){
        return me.margkerType;
    };
    this.create = function(option){
        var marker = new AMap.Marker({
            position:[lng,lat],
            content:me.content,
            icon:me.icon
        })
    };
}