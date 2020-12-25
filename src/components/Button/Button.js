import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.css';

/**
 * A button.
 *
 * @component
 */
function Button({ onClick, className, children }) {
	/**
	 * JSX
	 */

	return (
		<button
			type="button"
			onClick={onClick}
			className={`text-white border-4 border-solid border-black transition-all duration-300 ${styles.button} ${className}`}
		>
			<span className={`bg-black p-4 m-1 inline-block ${styles.button__inner}`}>
				{children}
			</span>
		</button>
	);
}

Button.defaultProps = {
	className: ''
};

Button.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
	className: PropTypes.string
};

export default Button;
