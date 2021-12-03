import process from "process"
import {Buffer} from "buffer"

import { default as ConnectorProvider } from "./components/ConnectorProvider/ConnectorProvider.vue"

window.global = window
window.process = process
window.Buffer = Buffer

export { ConnectorProvider }
