import{_ as s,c as a,o as n,a2 as e}from"./chunks/framework.Ii5gFk8W.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/database/oracle/Pipelined.md","filePath":"docs/database/oracle/Pipelined.md"}'),t={name:"docs/database/oracle/Pipelined.md"},p=e(`<h2 id="typical-pipelined-example" tabindex="-1">Typical Pipelined Example <a class="header-anchor" href="#typical-pipelined-example" aria-label="Permalink to &quot;Typical Pipelined Example&quot;">​</a></h2><p>This are the typical steps to perform when using PL/SQL Table Functions:</p><ul><li><p>The producer function must use the PIPELINED keyword in its declaration.</p></li><li><p>The producer function must use an OUT parameter that is a record, corresponding to a row in the result set.</p></li><li><p>Once each output record is completed, it is sent to the consumer function through the use of the PIPE ROW keyword.</p></li><li><p>The producer function must end with a RETURN statement that does not specify any return value.</p></li><li><p>The consumer function or SQL statement then must use the TABLE keyword to treat the resulting rows from the PIPELINE function like a regular table. <strong>The first step</strong> is to define the format of the rows that are going to be returned. In this case here, we&#39;re going to return a INT, DATE followed by a VARCHAR2(25).</p></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CREATE OR REPLACE TYPE myObjectFormat </span></span>
<span class="line"><span>AS OBJECT</span></span>
<span class="line"><span>(</span></span>
<span class="line"><span>  A   INT,</span></span>
<span class="line"><span>  B   DATE,</span></span>
<span class="line"><span>  C   VARCHAR2(25)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>/</span></span></code></pre></div><p><strong>Next</strong> a collection type for the type previously defined must be created.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CREATE OR REPLACE TYPE myTableType</span></span>
<span class="line"><span>   AS TABLE OF myObjectFormat</span></span>
<span class="line"><span>/</span></span></code></pre></div><p><strong>Finally</strong>, the producer function is packaged in a package. It is a pipelined function as indicated by the keyword pipelined.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CREATE OR REPLACE PACKAGE myDemoPack</span></span>
<span class="line"><span>AS</span></span>
<span class="line"><span>      FUNCTION prodFunc RETURN myTableType PIPELINED;</span></span>
<span class="line"><span>END;</span></span>
<span class="line"><span>/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CREATE OR REPLACE PACKAGE BODY myDemoPack AS</span></span>
<span class="line"><span>FUNCTION prodFunc RETURN myTableType PIPELINED IS</span></span>
<span class="line"><span>BEGIN</span></span>
<span class="line"><span>  FOR i in 1 .. 5</span></span>
<span class="line"><span>    LOOP</span></span>
<span class="line"><span>      PIPE ROW (myObjectFormat(i,SYSDATE+i,&#39;Row &#39;||i));</span></span>
<span class="line"><span>    END LOOP;</span></span>
<span class="line"><span>    RETURN;</span></span>
<span class="line"><span>  END;</span></span>
<span class="line"><span>END;</span></span>
<span class="line"><span>/</span></span></code></pre></div><p>Test It:</p><p>ALTER SESSION SET NLS_DATE_FORMAT=&#39;dd.mm.yyyy&#39;; SELECT * FROM TABLE(myDemoPack.prodFunc());</p><table><thead><tr><th>A</th><th>B</th><th>C</th></tr></thead><tbody><tr><td>1</td><td>31.05.2004</td><td>Row 1</td></tr><tr><td>2</td><td>01.06.2004</td><td>Row 2</td></tr><tr><td>3</td><td>02.06.2004</td><td>Row 3</td></tr><tr><td>4</td><td>03.06.2004</td><td>Row 4</td></tr><tr><td>5</td><td>04.06.2004</td><td>Row 5</td></tr></tbody></table>`,11),i=[p];function l(o,c,d,r,h,u){return n(),a("div",null,i)}const T=s(t,[["render",l]]);export{m as __pageData,T as default};
