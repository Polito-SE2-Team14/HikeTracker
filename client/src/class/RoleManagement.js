/**
 * Check If User is Hiker
 * @param {string} user - Type of user
 * @returns {boolean}
 */
const isHiker = (user) => {
    //return true; // DEBUG
    return user && user.type === 'hiker';
};

/**
 * Check If User is localGuide
 * @param {string} user - Type of user
 * @returns {boolean}
 */
const isLocalGuide = (user) => {
     //console.log("userType === 'localGuide'", userType === 'localGuide')
    return user && user.type === 'localGuide';
};

/**
 * Check If User is hutWorker
 * @param {string} user - Type of user
 * @returns {boolean}
 */
 const isHutWorker = (user) => {
    return user && user.type === 'hutWorker';
};

/**
 * Check If User is hutWorker
 * @param {string} user - Type of user
 * @returns {boolean}
 */
 const isManager = (user) => {
    return user && user.type === 'manager';
};


const isAuthor = (user, hike) => {
    //return true; // DEBUG
    return user && user.userID === hike.hikeID
}



const RoleManagement = { isHiker, isHutWorker, isLocalGuide, isManager, isAuthor };
export default RoleManagement;