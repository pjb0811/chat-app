const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
require('jsdom-global/register');

Enzyme.configure({ adapter: new Adapter() });
