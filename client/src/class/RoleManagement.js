/**
 * Check If User is Hiker
 * @param {string} userType - Type of user
 * @returns {boolean}
 */
const isHiker = (userType) => {
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






const RoleManagement = { isHiker, isHutWorker, isLocalGuide, isManager };
export default RoleManagement;