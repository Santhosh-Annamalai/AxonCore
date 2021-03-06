'use strict';

/**
 * Hold a bunch of something
 * Based of Eris Collection
 *
 * @author KhaaZ
 *
 * @prop {Class} baseObject - The base class for all items
 * @extends Map
 */
class Collection extends Map {
    /**
     * Construct a Collection
     *
     * @arg {Class} baseObject The base class for all items
     * @arg {Number} [limit] Max number of items to hold
     */
    constructor(baseObject) {
        super();
        this.baseObject = baseObject ? baseObject : null;
    }

    /**
     * Map to array
     *
     * @returns {Array<Class>}
     * @memberof Collection
     */
    toArray() {
        return [...this.values];
    }

    /**
     * Add an object
     * If baseObject, add only if instance of baseObject
     * If no baseObject, add
     *
     * @arg {String} value - The ID of the object
     * @arg {Object} key - The object data
     * @arg {Boolean} replace - Whether to replace an existing object with the same ID
     * @returns {Class} The existing or newly created object
     */
    add(key, value, replace) {
        const existing = this.get(key);
        if (existing && !replace) {
            return existing;
        }
        if (this.baseObject && !(value instanceof this.baseObject)) {
            return null;
        }

        this.set(key, value);

        return value;
    }

    /**
     * Return the first object to make the function evaluate true
     *
     * @arg {function} func - A function that takes an object and returns true if it matches
     * @returns {Class?} The first matching object, or undefined if no match
     */
    find(func) {
        for (const item of this.values()) {
            if (func(item)) {
                return item;
            }
        }
        return undefined;
    }

    /**
     * Get a random object from the Collection
     *
     * @returns {Class?} The random object, or undefined if there is no match
     */
    random() {
        if (!this.size) {
            return undefined;
        }
        return Array.from(this.values())[Math.floor(Math.random() * this.size)];
    }

    /**
     * Return all the objects that make the function evaluate true
     *
     * @arg {function} func - A function that takes an object and returns true if it matches
     * @returns {Array<Class>} An array containing all the objects that matched
     */
    filter(func) {
        const arr = [];
        for (const item of this.values()) {
            if (func(item)) {
                arr.push(item);
            }
        }
        return arr;
    }

    /**
     * Return an array with the results of applying the given function to each element
     *
     * @arg {function} func - A function that takes an object and returns something
     * @returns {Array} An array containing the results
     */
    map(func) {
        const arr = [];
        for (const item of this.values()) {
            arr.push(func(item));
        }
        return arr;
    }

    /**
     * Test if at least one element passes the test implemented by the provided function. Returns true if yes, or false if not.
     *
     * @arg {function} func - A function that takes an object and returns true if it matches
     * @returns {Boolean} An array containing all the objects that matched
     */
    some(func) {
        for (const item of this.values()) {
            if (func(item)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Test if all elements passe the test implemented by the provided function. Returns true if yes, or false if not.
     *
     * @arg {function} func - A function that takes an object and returns true if it matches
     * @returns {Boolean} An array containing all the objects that matched
     */
    every(func) {
        for (const item of this.values()) {
            if (!func(item)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Update an object
     *
     * @arg {String} key - The ID of the object
     * @arg {Object} value - The updated object data
     * @arg {Boolean} replace - Whether to replace an existing object with the same ID
     * @returns {Class} The updated object
     */
    update(key, value) {
        return this.add(key, value, true);
    }

    /**
    * Remove an object
    *
    * @arg {String} key - The ID of the object
    * @returns {Class?} The removed object, or null if nothing was removed
    */
    remove(key) {
        const item = this.get(key);
        if (!item) {
            return null;
        }
        this.delete(key);
        return item;
    }

    toString() {
        return `[Collection<${this.baseObject.name}>]`;
    }
}

export default Collection;
