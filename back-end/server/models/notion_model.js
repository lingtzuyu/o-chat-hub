require('dotenv').config();

const { sqlDB } = require('./mysqlconn');

const { SQLException } = require('../services/exceptions/sql_exception');

// see notionaccess already contain token or not
const checkNotionTokenExist = async (userId) => {
  try {
    const notionTokenCheckQuery = `SELECT * 
    FROM notionaccess 
    WHERE user_id = ?`;
    const [result] = await sqlDB.execute(notionTokenCheckQuery, [userId]);
    return result;
  } catch (err) {
    throw new SQLException(
      'Error when query notion token',
      `Error occured when userId:${userId} querying notion token`,
      'notionaccess',
      'select',
      'checkNotionTokenExist',
    );
  }
};

const saveNotionTokenAndDBid = async (
  userId,
  notionToken,
  notionDatabaseid,
  notionDBLink,
) => {
  const conn = await sqlDB.getConnection();

  // notion token table
  const insertNotionTokenQuery =
    'INSERT INTO notionaccess SET user_id = ?, notionAccessToken =?, relatedNotionPageId = ?';

  // user table
  const updateURLinUser =
    'UPDATE user set notionConnect = 1, notiondblink = ? WHERE id = ? ';
  try {
    await conn.query('START TRANSACTION');

    await conn.query(insertNotionTokenQuery, [
      userId,
      notionToken,
      notionDatabaseid,
    ]);

    await conn.query(updateURLinUser, [notionDBLink, userId]);

    await conn.query('COMMIT');

    return true;
  } catch (err) {
    await conn.query('ROLLBACK');
    throw new SQLException(
      'Error when insert notion token, please try again',
      'Error occured when transaction while inserting notion token',
      'notionaccess',
      'insert',
      'saveNotionTokenAndDBid',
    );
  } finally {
    conn.release();
  }
};

// remove notion connection (temporary, can recover if necessary)
const removeNotionConnect = async (userId) => {
  const conn = await sqlDB.getConnection();
  try {
    await conn.query('START TRANSACTION');
    // 0 stands for false
    const changeUserNotionStatusQuery = `UPDATE user 
        SET notionConnect = 0 
        WHERE id = ?`;

    // 1 stands for true
    const removeNotionAccessQuery = `UPDATE notionaccess 
        SET isRemoved = 1 
        WHERE user_id = ?`;

    const removedDBIdQuery = `SELECT relatedNotionPageId 
        FROM notionaccess 
        WHERE user_id = ?`;

    await conn.query(changeUserNotionStatusQuery, [userId]);

    await conn.query(removeNotionAccessQuery, [userId]);

    const removedResult = await conn.query(removedDBIdQuery, [userId]);

    const removedDBId = removedResult[0][0].relatedNotionPageId;

    await conn.query('COMMIT');
    return { status: 'sucess Removed', removedDBId };
  } catch (err) {
    await conn.query('ROLLBACK');
    throw new SQLException(
      'Error when remove notion connection, please try again',
      'Error occured when remove notion connection transaction',
      'notionaccess',
      'update',
      'removeNotionConnect',
    );
  } finally {
    await conn.release();
  }
};

// recover
const recoverNotionConnect = async (userId) => {
  const conn = await sqlDB.getConnection();
  try {
    await conn.query('START TRANSACTION');

    // 1 stands for connected, 0 stands for disconnected

    const changeUserNotionStatusQuery = `UPDATE user 
        SET notionConnect = 1
        WHERE id = ?`;

    const removeNotionAccessQuery =
      'UPDATE notionaccess SET isRemoved = 0 WHERE user_id = ?';

    const recoveredDBIdQuery =
      'SELECT relatedNotionPageId FROM notionaccess WHERE user_id = ?';

    await conn.query(changeUserNotionStatusQuery, [userId]);

    await conn.query(removeNotionAccessQuery, [userId]);

    const recoveredResult = await conn.query(recoveredDBIdQuery, [userId]);

    const recoveredDBId = recoveredResult[0][0].relatedNotionPageId;

    await conn.query('COMMIT');
    return { status: 'sucess Recovered', recoveredDBId };
  } catch (err) {
    await conn.query('ROLLBACK');
    throw new SQLException(
      'Error when recover notion connection, please try again',
      'Error occured when recover notion connection transaction',
      'notionaccess',
      'update',
      'recoverNotionConnect',
    );
  } finally {
    await conn.release();
  }
};

module.exports = {
  checkNotionTokenExist,
  saveNotionTokenAndDBid,
  removeNotionConnect,
  recoverNotionConnect,
};
