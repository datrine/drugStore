module.exports=function(api){
    api.cache(true);

    const presets=[
        ["@babel/preset-env",{
            "loose":true,
            "modules":"auto"
        }],["@babel/react"]
];
    const plugins=[];

    return {
        presets,
        plugins
    }
}