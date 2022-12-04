/**
 * Check If User is Hiker
 * @param {string} userType - Type of user
 * @returns {boolean}
 */
const isHiker = async (userType) => {
    return userType === 'hiker';
};

/**
 * Check If User is localGuide
 * @param {string} userType - Type of user
 * @returns {boolean}
 */
 const isLocalGuide = async (userType) => {
    return userType === 'localGuide';
};

/**
 * Check If User is hutWorker
 * @param {string} userType - Type of user
 * @returns {boolean}
 */
 const isHutWorker = async (userType) => {
    return userType === 'hutWorker';
};

/**
 * Check If User is hutWorker
 * @param {string} userType - Type of user
 * @returns {boolean}
 */
 const isManager = async (userType) => {
    return userType === 'manager';
};






const RoleManagement = { isHiker, isHutWorker, isLocalGuide, isManager };
export default RoleManagement;