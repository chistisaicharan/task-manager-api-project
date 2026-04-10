

const {DataTypes}=require("sequelize")

const sequelize=require("../config/db")

const task=sequelize.define("task",{
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
  },

  status: {
    type: DataTypes.ENUM("pending", "completed"),
    defaultValue: "pending",
  },

  priority: {
    type: DataTypes.ENUM("low", "medium", "high"),
    defaultValue: "medium",
  },
  isDeleted: {
  type: DataTypes.BOOLEAN,
  defaultValue: false
},

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }

}, {
  tableName: "tasks",
  timestamps: true
})


module.exports=task