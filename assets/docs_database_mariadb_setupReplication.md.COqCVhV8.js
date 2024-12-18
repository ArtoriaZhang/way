import{_ as s,c as a,o as i,a2 as e}from"./chunks/framework.CCoplHXX.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/database/mariadb/setupReplication.md","filePath":"docs/database/mariadb/setupReplication.md"}'),t={name:"docs/database/mariadb/setupReplication.md"},n=e(`<h2 id="setup-replication" tabindex="-1">Setup replication <a class="header-anchor" href="#setup-replication" aria-label="Permalink to &quot;Setup replication&quot;">​</a></h2><ol><li><p>Active <strong>the binary log</strong> and <a href="#binary-log-format">binary log formats</a> To enable binary logging, start the server with the --log-bin[=name] option</p></li><li><p>Config binary log The format for binary log events can be configured by setting the binlog_format system variable. If you have the SUPER privilege, then you can change it dynamically with SET GLOBAL. For example:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>SET GLOBAL binlog_format=&#39;ROW&#39;;</span></span></code></pre></div><p>You can also change it dynamically for just a specific session with SET SESSION. For example:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>SET SESSION binlog_format=&#39;ROW&#39;;</span></span></code></pre></div><p>It can also be set in a server option group in an option file prior to starting up the server. For example:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>[mariadb]</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>binlog_format=ROW</span></span></code></pre></div></li><li><p>Give the master a unique <strong>server_id</strong>. All slaves must also be given a server_id. This can be a number from 1 to 232-1, and must be unique for each server in the replicating group.</p></li><li><p>Specify a unique name for your replication logs with --log-basename. If this is not specified your host name will be used and there will be problems if the hostname ever changes.</p></li><li><p>Slaves will need permission to connect and start replicating from a server. Usually this is done by creating a dedicated slave user, and granting that user permission only to replicate (REPLICATION SLAVE permission).</p></li></ol><h2 id="example-enabling-replication-for-mariadb" tabindex="-1">Example Enabling Replication for MariaDB <a class="header-anchor" href="#example-enabling-replication-for-mariadb" aria-label="Permalink to &quot;Example Enabling Replication for MariaDB&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>[mariadb]</span></span>
<span class="line"><span>log-bin</span></span>
<span class="line"><span>server_id=1</span></span>
<span class="line"><span>log-basename=master1</span></span>
<span class="line"><span>binlog-format=mixed</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CREATE USER &#39;replication_user&#39;@&#39;%&#39; IDENTIFIED BY &#39;bigs3cret&#39;;</span></span>
<span class="line"><span>GRANT REPLICATION SLAVE ON *.* TO &#39;replication_user&#39;@&#39;%&#39;;</span></span></code></pre></div><h2 id="configuring-the-replica" tabindex="-1">Configuring the Replica <a class="header-anchor" href="#configuring-the-replica" aria-label="Permalink to &quot;Configuring the Replica&quot;">​</a></h2><p>Give the slave a unique server_id. All servers, whether masters or replicas, are given a server_id. This can be a number from 1 to 232-1, and must be unique for each server in the replicating group. The server will need to be restarted in order for a change in this option to take effect.</p><h2 id="getting-the-master-s-binary-log-co-ordinates" tabindex="-1">Getting the Master&#39;s Binary Log Co-ordinates <a class="header-anchor" href="#getting-the-master-s-binary-log-co-ordinates" aria-label="Permalink to &quot;Getting the Master&#39;s Binary Log Co-ordinates&quot;">​</a></h2><p>Now you need prevent any changes to the data while you view the binary log position. You&#39;ll use this to tell the slave at exactly which point it should start replicating from.</p><p>On the master, flush and lock all tables by running</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>FLUSH TABLES WITH READ LOCK.</span></span></code></pre></div><p>Keep this session running - exiting it will release the lock. Get the current position in the binary log by running</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-6lLHW" id="tab-bryP8GA" checked="checked"><label for="tab-bryP8GA">mariadb</label><input type="radio" name="group-6lLHW" id="tab-VsH-qY0"><label for="tab-VsH-qY0">mysql</label></div><div class="blocks"><div class="language-shell vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">SHOW</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> MASTER</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> STATUS:</span></span></code></pre></div><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">show</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> binary</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> log</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> status</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div></div></div><table><thead><tr><th>File</th><th>Position</th><th>Binlog_Do_DB</th><th>Binlog_Ignore_DB</th></tr></thead><tbody><tr><td>master1-bin.000096</td><td>568</td><td></td><td></td></tr></tbody></table><ul><li>Record the File and Position details. If binary logging has just been enabled, these will be blank.</li><li>Now, with the lock still in place, copy the data from the master to the slave. See Backup, Restore and Import for details on how to do this.</li><li>Note for live databases: You just need to make a local copy of the data, you don&#39;t need to keep the master locked until the slave has imported the data.</li><li>Once the data has been copied, you can release the lock on the master by running UNLOCK TABLES.</li></ul><h2 id="start-the-slave" tabindex="-1">Start the Slave <a class="header-anchor" href="#start-the-slave" aria-label="Permalink to &quot;Start the Slave&quot;">​</a></h2><p>Once the data has been imported, you are ready to start replicating. Begin by running a CHANGE MASTER TO, making sure that MASTER_LOG_FILE matches the file and MASTER_LOG_POS the position returned by the earlier SHOW MASTER STATUS. For example:</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-VSWiu" id="tab-TqLkVOX" checked="checked"><label for="tab-TqLkVOX">mariadb</label><input type="radio" name="group-VSWiu" id="tab-Op-BY8p"><label for="tab-Op-BY8p">mysql</label></div><div class="blocks"><div class="language-shell vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">CHANGE</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> MASTER</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> TO</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  MASTER_HOST</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;master.domain.com&#39;,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  MASTER_USER</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;replication_user&#39;,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  MASTER_PASSWORD</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;bigs3cret&#39;,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  MASTER_PORT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3306</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  MASTER_LOG_FILE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;master1-bin.000096&#39;,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  MASTER_LOG_POS</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">568</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  MASTER_CONNECT_RETRY</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">CHANGE</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> REPLICATION</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> SOURCE</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> TO</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         SOURCE_HOST</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;source_host_name&#39;,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         SOURCE_USER</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;replication_user_name&#39;,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         SOURCE_PASSWORD</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;replication_password&#39;,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         SOURCE_LOG_FILE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;recorded_log_file_name&#39;,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         SOURCE_LOG_POS</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">recorded_log_position,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    GET_source_PUBLIC_KEY</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div></div></div><h2 id="use-global-transaction-id-gtid" tabindex="-1">Use Global Transaction Id (GTID) <a class="header-anchor" href="#use-global-transaction-id-gtid" aria-label="Permalink to &quot;Use Global Transaction Id (GTID)&quot;">​</a></h2><p>All that is needed is to add the MASTER_USE_GTID option to the CHANGE MASTER statement, for example:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CHANGE MASTER TO MASTER_USE_GTID = slave_pos</span></span></code></pre></div><p>See Global Transaction ID for a full description.</p><p>Now start the slave with the START SLAVE command:</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-KwnGi" id="tab-_4fbBQU" checked="checked"><label for="tab-_4fbBQU">mariadb</label><input type="radio" name="group-KwnGi" id="tab-puYU5xJ"><label for="tab-puYU5xJ">mysql</label></div><div class="blocks"><div class="language-shell vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">START</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> SLAVE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> replica</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div></div></div><p>Check that the replication is working by executing the SHOW SLAVE STATUS command:</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-3YzlS" id="tab-zVVUDCU" checked="checked"><label for="tab-zVVUDCU">mariadb</label><input type="radio" name="group-3YzlS" id="tab--OFA6_J"><label for="tab--OFA6_J">mysql</label></div><div class="blocks"><div class="language-shell vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">SHOW</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> SLAVE</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> STATUS</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\G</span></span></code></pre></div><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">show</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> replica</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> status</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div></div></div><h3 id="binary-log-format" tabindex="-1">binary log format <a class="header-anchor" href="#binary-log-format" aria-label="Permalink to &quot;binary log format&quot;">​</a></h3><ul><li><p>Statement-Based Logging: When statement-based logging is enabled, statements are logged to the binary log exactly as they were executed. Temporary tables created on the primary will also be created on the replica.</p></li><li><p>Mixed Logging: When mixed logging is enabled, the server uses a combination of statement-based logging and row-based logging. Statement-based logging is used where possible, but when the server determines a statement may not be safe for statement-based logging, it will use row-based logging instead.</p></li><li><p>Row-Based Logging: When row-based logging is enabled, DML statements are not logged to the binary log. Instead, each insert, update, or delete performed by the statement for each row is logged to the binary log separately. DDL statements are still logged to the binary log. Row-based logging uses <strong>more storage</strong> than the other log formats but is <strong>the safest</strong> to use. In practice mixed logging should be as safe.</p></li></ul>`,27),l=[n];function p(h,o,r,d,c,g){return i(),a("div",null,l)}const u=s(t,[["render",p]]);export{b as __pageData,u as default};
