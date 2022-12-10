/**
 * Check If User is Hiker
 * @param {string} userType - Type of user
 * @returns {boolean}
 */
const isHiker = (userType) => {
    //return true; // DEBUG
    return userType === 'hiker';
};

/**
 * Check If User is localGuide
 * @param {string} userType - Type of user
 * @returns {boolean}
 */
const isLocalGuide = (userType) => {
     //console.log("userType === 'localGuide'", userType === 'localGuide')
    return userType === 'localGuide';
};

/**
 * Check If User is hutWorker
 * @param {string} userType - Type of user
 * @returns {boolean}
 */
 const isHutWorker = (userType) => {
    return userType === 'hutWorker';
};

/**
 * Check If User is hutWorker
 * @param {string} userType - Type of user
 * @returns {boolean}
 */
 const isManager = (userType) => {
    return userType === 'manager';
};


const isAuthor = (user, hike) => {
    //return true; // DEBUG
    return user.userID === hike.hikeID
}



const RoleManagement = { isHiker, isHutWorker, isLocalGuide, isManager, isAuthor };
export default RoleManagement;