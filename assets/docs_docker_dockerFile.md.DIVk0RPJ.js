import{_ as t,c as e,o as s,a2 as a}from"./chunks/framework.CCoplHXX.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/docker/dockerFile.md","filePath":"docs/docker/dockerFile.md"}'),o={name:"docs/docker/dockerFile.md"},n=a(`<h2 id="both-entrypoint-cmd-exists" tabindex="-1">Both entrypoint &amp; cmd exists <a class="header-anchor" href="#both-entrypoint-cmd-exists" aria-label="Permalink to &quot;Both entrypoint &amp; cmd exists&quot;">​</a></h2><p>Below is</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>ENTRYPOINT [&quot;/start.sh&quot;]</span></span>
<span class="line"><span>CMD [&quot;aptly&quot;, &quot;api&quot;, &quot;serve&quot;]</span></span></code></pre></div><p>exactly same as</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>entrypoint[&quot;/start.sh&quot;, &quot;aptly&quot;, &quot;api&quot;, &quot;serve&quot;]</span></span></code></pre></div>`,5),i=[n];function p(c,d,r,l,u,h){return s(),e("div",null,i)}const q=t(o,[["render",p]]);export{m as __pageData,q as default};