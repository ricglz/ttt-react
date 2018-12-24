import PropTypes from 'prop-types'

export const userPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string,
  photoUrl: PropTypes.string,
  uid: PropTypes.string.isRequired,
})