const Join = {}
Join.oneToOne = (table1, table2, fKey) => {
    table1.hasOne(table2, { foreignKey: fKey });
    table2.belongsTo(table1, { foreignKey: fKey });
}
Join.oneToMany = (table1, table2, fKey) => {
    table1.hasMany(table2, { foreignKey: fKey });
    table2.belongsTo(table1, { foreignKey: fKey });
}
module.exports = { Join };