const db = require("../../db/models/index");
const Demo = db.milantest;
const sequelize = db.sequelize;




const demo = async (req, res) => {
    try {

        // check if GetDemoData() store procedure exists in database or not if not then create it
        const checkStoreProcedure = await sequelize.query(`SELECT * FROM sys.objects WHERE type = 'P' AND name = 'GetDemoData'`);
        if (checkStoreProcedure[0].length == 0) {
            await sequelize.query(`CREATE PROCEDURE GetDemoData AS SELECT * FROM milantests`);
        }

        // in ms sql we have dbo.GetDemoData() store procedure
        const demoData = await sequelize.query('EXEC dbo.GetDemoData');
        return demoData;
    } catch (error) {
        throw error;
    }
}

const addDemo = async (demo) => {
    try {
        // check if AddDemoData() store procedure exists in database or not if not then create it
        const checkStoreProcedure = await sequelize.query(`SELECT * FROM sys.objects WHERE type = 'P' AND name = 'AddDemoData'`);

        // if exists then drop it
        if (checkStoreProcedure[0].length > 0) {
            await sequelize.query(`DROP PROCEDURE AddDemoData`);
        }

        // create new store procedure
        await sequelize.query(`CREATE PROCEDURE AddDemoData 
        @name varchar(50), 
        @age int,
        @totalCount int OUTPUT
    AS 
    BEGIN
        INSERT INTO milantests (name, age) VALUES (@name, @age);
        SELECT @totalCount = COUNT(*) FROM milantests;
    END;`);

        // in ms sql we have dbo.AddDemoData() store procedure
        // const newDemo = await sequelize.query(`EXEC dbo.AddDemoData @name = '${demo.name}', @age = ${demo.age}`);
        // const newDemo = await sequelize.query(`EXEC dbo.AddDemoData @name = '${demo.name}', @age = ${demo.age}, @totalCount = 0 OUTPUT`);
        const newDemo = await sequelize.query(`DECLARE @outputCount int; EXEC dbo.AddDemoData @name = '${demo.name}', @age = ${demo.age}, @totalCount = @outputCount OUTPUT; SELECT @outputCount AS totalCount;`);
        console.log(newDemo);
        return newDemo[0][0]


    } catch (error) {
        throw error;
    }
}

const updateDemo = async (id, demo) => {
    try {
        // check if UpdateDemoData() store procedure exists in database or not if not then create it
        const checkStoreProcedure = await sequelize.query(`SELECT * FROM sys.objects WHERE type = 'P' AND name = 'UpdateDemoData'`);

        // if exists then drop it
        if (checkStoreProcedure[0].length > 0) {
            await sequelize.query(`DROP PROCEDURE UpdateDemoData`);
        }

        // create new store procedure
        await sequelize.query(`CREATE PROCEDURE UpdateDemoData
        @id int,
        @name varchar(50),
        @age int
    AS
    BEGIN
        UPDATE milantests SET name = @name, age = @age WHERE id = @id;
    END;`);

        // in ms sql we have dbo.UpdateDemoData() store procedure
        const updatedDemo = await sequelize.query(`EXEC dbo.UpdateDemoData @id = ${id}, @name = '${demo.name}', @age = ${demo.age}`);
        return updatedDemo
    } catch (error) {
        throw error;
    }
}

const deleteDemo = async (id) => {
    try {
        // check if DeleteDemoData() store procedure exists in database or not if not then create it
        const checkStoreProcedure = await sequelize.query(`SELECT * FROM sys.objects WHERE type = 'P' AND name = 'DeleteDemoData'`);

        // if exists then drop it
        if (checkStoreProcedure[0].length > 0) {
            await sequelize.query(`DROP PROCEDURE DeleteDemoData`);
        }

        // create new store procedure
        await sequelize.query(`CREATE PROCEDURE DeleteDemoData
        @id int
    AS
    BEGIN
        DELETE FROM milantests WHERE id = @id;
    END;`);

        // in ms sql we have dbo.DeleteDemoData() store procedure
        const deletedDemo = await sequelize.query(`EXEC dbo.DeleteDemoData @id = ${id}`);
        return deletedDemo
    } catch (error) {
        throw error;
    }
}

module.exports = {
    demo,
    addDemo,
    updateDemo,
    deleteDemo
}