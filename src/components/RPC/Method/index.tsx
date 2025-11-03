import styles from "./method.module.css"
import CodeBlock from '@theme/CodeBlock';
import Admonition from '@theme/Admonition';
import DataType, { DataTypeProps } from "../../DataType";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

type APIDataType = "string" | "number" | "address" | "message-id" | "object";

type ParamType = {
    id: string,
    required?: boolean,
    type: DataTypeProps["type"],
    description?: string;
    values?: ParamType[]
}

type ReturnType = {
    id: string,
    type: DataTypeProps["type"],
    description?: string;
    values?: ParamType[]
}

type EndpointProps = {
    method: string,
    description: string,
    authHeader?: boolean,
    parameters?: ParamType[]
    returns?: ReturnType[] | ReturnType;
    response: Array<object | string | number | null> | string | number;
    exampleParams: Array<object | string | number | null>
}

export default function Method({ method, authHeader, description, parameters, returns, response, exampleParams }: EndpointProps) {
    return <>
        {authHeader === true ? <Admonition type="info" title="Info">
            This function requires the <code>Authorization</code> Header, you can read more about this header <a href="/moki-network/json-rpc/authentication">here</a>.
        </Admonition> : <></>}
        <p>{description}</p>
        <h2>Parameters</h2>
        {parameters && parameters.length > 0 ? <><ul className={`${styles.rpcList}`}>

            {
                parameters.map(param => {
                    return <ListItem {...param} />
                })
            }
        </ul></> : <>None</>}
        <h2>Returns</h2>
        {returns && Array.isArray(returns) && returns.length > 0 ? <><ul className={`${styles.rpcList}`}>

            {
                returns.map(param => {
                    return <ListItem {...param} />
                })
            }
        </ul></> : returns ? <ListItem noList {...returns as ReturnType} /> : <></>}
        <h2>Example</h2>
        <h3>Request</h3>
        <Tabs>
            <TabItem value="bash" label="curl">
                <CodeBlock language="bash">
                    {`curl https://mainnet.moki.network \\
  -X POST \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc": "2.0", "method": "${method}", "params": ${JSON.stringify(exampleParams) ?? "[]"}, "id": 1}'`}
                </CodeBlock>
            </TabItem>
            <TabItem value="js" label="javascript">


                <CodeBlock language="javascript">
                    {`import fetch from "node-fetch"

fetch("https://mainnet.moki.network", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    method: "${method}",
    params: ${JSON.stringify(exampleParams) ?? "[]"},
    id: 1,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.error(error)
  })`}
                </CodeBlock>
            </TabItem>
        </Tabs>
        <h3>Reponse</h3>
        <CodeBlock className="language-json" title="Example Response">
            {JSON.stringify({
                "jsonrpc": "2.0",
                "id": 1,
                result: !Array.isArray(response) ? response : response ?? []
            }, null, 2)}
        </CodeBlock>
        {/* 
        {response ?
            <>
                <CodeBlock className="language-json" title="Example Response">
                    {JSON.stringify(response, null, 2)}
                </CodeBlock></> : <></>} */}
    </>
}

function ListItem(param: ParamType & { noList?: boolean }) {

    const ItemComponent = () => {
        return <><b><code>{param.id}</code></b>: <DataType type={param.type}></DataType>
            {param.required ? <i> [Required]</i> : <></>}{param.description ? ` - ${param.description}` : ""}</>
    }
    return (<>
        {param.noList ? <ItemComponent /> :
            <li>
                <ItemComponent />
            </li>}
        {
            (param.type === "object" || param.type === "array") && param.values && param.values.length > 0 ? <ul className={`${styles.rpcList}`}>{param.values.map(pa => <ListItem {...pa} />)}</ul> : <></>
        }
    </>)
}