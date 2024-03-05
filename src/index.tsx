/* @refresh reload */
import { render } from 'solid-js/web'

import 'virtual:uno.css'
import './wuxing/index.css'
import './lib/ion'
import App from './wuxing/index'


const root = document.getElementById('root')

render(() => <App />, root!)
