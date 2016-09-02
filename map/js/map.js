/**
 * Created by kroketTian on 2016/9/2.
 */
function map(){
    this.createmap = function(container){
        this.map = new AMap.Map(container,{
            resizeENable: true,
            zoom:10
        })
    }
}