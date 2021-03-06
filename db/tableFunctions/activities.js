const { get } = require("http");
const util = require("util");
const client = require("../client");

const createActivity = async ({ name, description }) => {
    try {
        const { rows: [activity] } = await client.query(`
            INSERT INTO activities(name, description)
            VALUES($1, $2)
            RETURNING *;
        `, [name, description]);

        return activity
    }
    catch (error) {
        throw error;
    }
}

const getAllActivities = async () => {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM activities;
        `);

        return rows;
    }
    catch (error) {
        throw error
    }
}

const updateActivity = async ({ id, name, description }) => {
    try {
        const { rows: [activity] } = await client.query(`
            UPDATE activities
            SET name=$1, description=$2
            WHERE id=$3
            RETURNING *;
        `, [name, description, id]);

        return activity;
    }
    catch (error) {
        throw error
    }
}

const getActivityById = async (activityId) => {

    try {
        const { rows: [activity] } = await client.query(`
        SELECT *
        FROM activities
        WHERE id=${activityId};
    `);

        return activity;
    }
    catch (error) {
        throw error;
    }
}


module.exports = {
    createActivity,
    getAllActivities,
    updateActivity,
    getActivityById
}