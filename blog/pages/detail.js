import React from 'react'
import Head from 'next/head'
import {Row,Col,Icon,Breadcrumb,Affix, BackTop} from 'antd'
import axios from 'axios'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'
import servicePath from '../config/apiUrl'



export default function Detail(props) {
  let articleContent=props.article_content
  const tocify = new Tocify()
  const renderer = new marked.Renderer()
  renderer.heading = function(text,level,raw){
    const anchor = tocify.add(text, level)
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
  }
  marked.setOptions({
    renderer:renderer,
    gfm:true,
    pedantic:false,
    sanitize:false,
    tables:true,
    breaks:false,
    smartLists:true,
    highlight:function(code){
      return hljs.highlightAuto(code).value
    }
  })
  let html = marked(props.article_content)
  return (
    <div>
      <Head>
        <title>Detail</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
              <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
              <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <div className="detailed-title">
              {props.title}
            </div>
            <div className="list-icon center">
              <span><Icon type="calendar" />{props.addTime}</span>
              <span><Icon type="folder" />{props.typeName}</span>
            </div>
            <div className="detailed-content"
              dangerouslySetInnerHTML={{__html:html}}>
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
           <Author />
           <Advert />
           <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              {tocify && tocify.render()}
            </div>
           </Affix>
        </Col>
      </Row>
      <Footer />
      <BackTop />
    </div>
  )
}

Detail.getInitialProps = async(context)=>{
  let id = context.query.id
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleById+id).then(
      (res)=>{
        resolve(res.data.data[0])
      }
    )
  })
  return await promise
}