// Global configuration for Parsley Configuration
window.ParsleyConfig = {
	errorClass: 'error',
	successClass: 'success',
	errorsWrapper: '<div class="error-msg"></div>',
	errorTemplate: '<div></div>',
	classHandler: function (parsleyField) {
		var $field = parsleyField.$element;
		var $wrap = $field.closest('.validation-wrap');
		var $handler = $field.add($wrap);

		if ($field.is('textarea[maxlength]')) {
			$field.off('keyup');
			$field.on('keyup', function () {
				characterCountdown($(this));
			});
		}
		return parsleyField;
	},
	errorsContainer: function (parsleyField) {
		var $wrap = parsleyField.$element.closest('.validation-wrap');
		var $msgContainer;
		if ($wrap.prev().is('.error-msg-wrap')) {
			$msgContainer = $wrap.prev('.error-msg-wrap');
		}
		else if ($wrap.nextAll('.error-msg-wrap').length > 0) {
			$msgContainer = $wrap.nextAll('.error-msg-wrap').last();
		} else {
			$msgContainer = $wrap.next().find('.error-msg-wrap');
		}
		return $msgContainer;
	}
};

// Validation listeners for adjusting height of Modal with adding/removing error messages
$(function () {
	$.listen('parsley:field:success', $('[data-modal]'), function () {
		modalHeightSetter();
	});
	$.listen('parsley:field:error', $('[data-modal]'), function () {
		modalHeightSetter();
	});
	$.listen('parsley:form:validated', $('[data-modal]'), function () {
		modalHeightSetter();
	});
});

$(document).on('click', '[data-validate-form]', function (e) {

	// ParsleyConfig definition if not already set
	window.ParsleyConfig = window.ParsleyConfig || {};
	window.ParsleyConfig.i18n = window.ParsleyConfig.i18n || {};

	// Define Custom the messages
	window.ParsleyConfig.i18n.en = $.extend(window.ParsleyConfig.i18n.en || {}, {
		defaultMessage: "This field seems to be invalid",
		type: {
			email: "This field should be a valid email",
			url: "This field should be a valid URL",
			number: "This field should be a valid number",
			integer: "This field should be a valid integer",
			digits: "This field should be digits",
			alphanum: "This field should be alphanumeric"
		},
		notblank: "This field should not be blank",
		required: "This is a required field",
		pattern: "This field seems to be invalid",
		min: "Value must be greater than or equal to %s",
		max: "Value must be lower than or equal to %s",
		range: "Value must be between %s and %s",
		minlength: "This field requires %s characters or more",
		maxlength: "This field requires %s characters or less",
		length: "This field length is invalid. It should be between %s and %s characters long",
		mincheck: "You must select at least %s choices",
		maxcheck: "You must select %s choices or less",
		check: "You must select between %s and %s choices",
		equalto: "Must equal previous field's value"
	});

	$form = $(this).closest('form');
	$form.parsley().validate();

	// Add/remove error class to .validation-wrap on submit and 
	// on Parsley error/success events.
	// initial validate
	$('.validation-wrap', $form).each(function () {
		validationWrapErrors($(this));
	});
	// event listeners
	$.listen('parsley:field:error', $form, function () {
		$('.validation-wrap', $form).each(function () {
			validationWrapErrors($(this));
		});
	});
	$.listen('parsley:field:success', $form, function () {
		$('.validation-wrap', $form).each(function () {
			validationWrapErrors($(this));
		});
	});


	// add any .error-msg-wrap[data-error-classes] to the child .error-msg elements
	$('.error-msg-wrap[data-error-classes]', $form).each(function () {
		var $msgWrap = $(this);
		var classes = $msgWrap.attr('data-error-classes');
		$('.error-msg', $msgWrap).addClass(classes);
	});


	function validationWrapErrors($wrap) {
		// move the parsley generated error message to be after .validation-wrap
		var $errorMsg = $('.error-msg', $wrap);
		$wrap.after($errorMsg);

		// setTimeout helps make sure DOM classes are added/removed before running
		setTimeout(function () {
			var $errors = $wrap.find('.error');
			if ($errors.length > 0) {
				$wrap.addClass('error');
			} else {
				$wrap.removeClass('error');
			}
		}, 10);
	}

	// If validation passes do the normal anchor or input type="submit" action
	if (!$form.parsley().isValid()) {
		hideLoder();
		e.preventDefault();
	}else{
		showLoader();
	}	
	
});


