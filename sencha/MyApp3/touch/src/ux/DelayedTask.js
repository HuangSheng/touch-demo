/**
 * <p>
 * <b>repair the Ext.util.DelayedTask Class bug</b>
 * </p>
 * The DelayedTask class provides a convenient way to "buffer" the execution of a method,<br>
 * performing `setTimeout` where a new timeout cancels the old timeout. When called, the<br>
 * task will wait the specified time period before executing. If during that time period,<br>
 * the task is called again, the original call will be canceled. This continues so that<br>
 * the function is only called a single time for each iteration.
 *
 * This method is especially useful for things like detecting whether a user has finished<br>
 * typing in a text field. An example would be performing validation on a keypress. You can<br>
 * use this class to buffer the keypress events for a certain number of milliseconds, and<br>
 * perform only if they stop for that amount of time.
 *
 * Using {@link Ext.ux.DelayedTask} is very simple:
 *
 *     //create the delayed task instance with our callback
 *     var task = Ext.create('Ext.util.DelayedTask', {<br>
 *          fn: function() {<br>
 *             console.log('callback!');<br>
 *          }<br>
 *     });<br>
 *
 *     task.delay(1500); //the callback function will now be called after 1500ms<br>
 *
 *     task.cancel(); //the callback function will never be called now, unless we call delay() again<br>
 *
 * ## Example
 *
 *     @example
 *     //create a textfield where we can listen to text
 *     var field = Ext.create('Ext.field.Text', {
 *         xtype: 'textfield',
 *         label: 'Length: 0'
 *     });
 *
 *     //add the textfield into a fieldset
 *     Ext.Viewport.add({
 *         xtype: 'formpanel',
 *         items: [{
 *             xtype: 'fieldset',
 *             items: [field],
 *             instructions: 'Type into the field and watch the count go up after 500ms.'
 *         }]
 *     });
 *
 *     //create our delayed task with a function that returns the fields length as the fields label
 *     var task = Ext.create('Ext.util.DelayedTask', function() {
 *         field.setLabel('Length: ' + field.getValue().length);
 *     });
 *
 *     // Wait 500ms before calling our function. If the user presses another key
 *     // during that 500ms, it will be canceled and we'll wait another 500ms.
 *     field.on('keyup', function() {
 *         task.delay(500);
 *     });
 *
 * @constructor
 * The parameters to this constructor serve as defaults and are not required.
 * @param {Function} fn The default function to call.
 * @param {Object} scope The default scope (The `this` reference) in which the function is called. If<br>
 * not specified, `this` will refer to the browser window.
 * @param {Array} args The default Array of arguments.
 */
Ext.define('Ext.ux.DelayedTask', {
    config: {
        interval: null,
        delay: null,
        fn: null,
        scope: null,
        args: null
    },

    constructor: function(fn, scope, args) {
        var config = {
            fn: fn,
            scope: scope,
            args: args
        };

        this.initConfig(config);
    },

    /**
     * Cancels any pending timeout and queues a new one.
     * @param {Number} delay The milliseconds to delay
     * @param {Function} newFn Overrides the original function passed when instantiated.
     * @param {Object} newScope Overrides the original `scope` passed when instantiated. Remember that if no scope<br>
     * is specified, `this` will refer to the browser window.
     * @param {Array} newArgs Overrides the original `args` passed when instantiated.
     */
    delay: function(delay, newFn, newScope, newArgs) {
        var me = this;
        //cancel any existing queued functions
        me.cancel();
        if (Ext.isNumber(delay)) {
            me.setDelay(delay);
        }
        fn = newFn || me.getFn();
        scope = newScope || me.getScope();
        args = newArgs || me.getArgs();
        
        call = function() {
            clearInterval(me.id);
            me.id = null;
            fn.apply(scope, args || []);
        };
        me.id = setInterval(call, me.getDelay());
    },

    /**
     * Cancel the last queued timeout
     */
    cancel: function() {
        if (this.id) {
            clearInterval(this.id);
            this.id = null;
        }
    }
});
