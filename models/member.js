module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define(
        'member3',
        {
            username : {
                type : DataTypes.STRING
            },
            password : {
                type : DataTypes.STRING(1024)
            }
        },
        {
            freezeTableName : true,
            timestamps : false,
            comment : 'member table'
        }
    );
    return Member;
};