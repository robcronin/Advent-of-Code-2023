import { parseLines } from '../utils/input';

const smallTestString = `2413
3215
3255
3446`;

const testString = `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`;
const input = `221123331111212122111223332142331421132432233453223512444255311111324154211411141212124424535453521421333424441421312124423331112111113331112
111123133132131211331331414421444423122224141534231435445125415234132153523441243221552235245531555424124343433331311211122211323113311223311
221131231323312111111124112111212313111422513252234215434121345332142254215211544531113421255155242411143444312414343431431232311311111213111
121111322233122333433114323331414123234324242311542511554452455115154214131252351455225434215445223131241424141321131321234431323231233121122
113212232121221313114212341314433222544231115242233231545132244432251351424243221251542411255551222311234251422114411222234142211312322313222
112133133122112434142431334222314251251533255411411333524351223323432112453145345221511455215541145113113434221421234432234231413112211322223
212212132312122112421332111323133212252515553212345214433131325221134313314554551145453534332351414113441521423221321444343423213211312233213
111331312231141443243134233333325151314255351132534311353542222533464364655632453564114545453234433244153331325114421422244411421122231323123
232221131212423231114312231435143545233431351153425543534632563325565453254665562456625112243213514554151545522325123231214313434231223132323
232223331213214322123224234351113541252453435332123345366342466565365433524246262644632332625211315354524443532143413241412321221314221321111
123212321311412231112442331313444434412315323131146366452364435254654322436646233566342225653652335341513254235245542314342412142331421133132
213331212443423334421331443243425525233521413225322464343263253452442636625466235544242425353345515153534454135522533341431222323441431122331
223213114411243322414331254235415453422523254366654462265636225455245325662465646454443563544363324442553553232534425552322132133342134222333
322132313444334241311323515414424552132443364436464435522346546434236555323422232454362323253232444335522113532432135333332324344124224123321
212122123332443431322332541221421214254254535243253636662346552454536362522642234322656433223525323233654522311324412231124441244424114143223
322134132131423224121441122232325224313332366544554654356632354553542544443636335665643354566554635463244252554454554135252223123133423234122
232331133444133222235351113434433535366632356552535232562633423334535625556644426354555334452344636664222552451241453412524542132214322224113
211233414322231413323112523342332132324664345244663536646226625642435354644355266245532656246525526362244335544225143434222212331224234244333
111333424233413342514554441234511446232356463235652532624356755543556453666776646764224245324456344663324252423551212542344151443342334233432
222221124241431435123225511131551324345446455352456564447747337746744563544546333775565362323644324334642635664213433232544251314122131432422
142221121442134534321525554412465244363442355354566327366367366557737337753774354445354633554325466622564522423211321214243424444434423314123
342123233314124123111554415211654223654566432625225557457536464533446756365445366336546736346535652325534326424434242342151442542223331413232
343333314321125251154112344325242625542553323663354377633366365337546646464767767755663657754666564366346326353625211533311245414243211423142
143344112212422555421134345524354646636365246435336464664757643375747544456573443647375567747453652635252636226255221422534443213524243324121
143434122441324252233255444334253562445566365445565347546347373566776676366447677567476764633744772552225524263252522145143233122411321434432
112122244134123525211424455466333345523354657363635737334635566355763554465746775546766767564546775766262642255533254133513431212212414211413
122334313312454341242114535626236263425534777465446747656655343643574433466543556647756437346373567476534626454256244641544232531523231122311
424344233125442542445355633236362554232277365554654533574635666457573543344634543676647537467643657343554322353343355465231231142345532234323
243433424124241433331253645652254252533664346574373764335536373676678466455443736534375636467364374353552423452453544222544545154123552144411
124323115542332441141524324344635326347675576637734644735763776477768657587748476766555774456364363765366334635454264446445453315434453434341
313424322314355334144532233626362566535436367474435744576464557868766864686567755486687466737765474475347365645665322335551124132232231443444
121444332152323212356466236355222636374554366357357366345667745464744847687858466745645536733447434365664737534444463524463434541445334114111
341132431213551323114566332224654366476354774765335568666744654885685857748676747466878756364446646753353775753543642443642521541144151121413
113422433423421121542354355236663634536574445576576786857676746556678655856475587586557754874745366676556746663654256544254243421333544534233
233315422412325141456226525452626736574435466757357668845846776845875755757557465648788857474556564667577656357246442262645332122323551514144
323313125235152323564646564422374536653737467754567554648467464448548846484486468674548767557775533735655377353726566444563543131323115424424
334155543443142146433436343436676763565636755354886644877675687588858855848755464477656658455667846733633373376554632355226344232543112245221
414431145531254536324634225223565336474466647646546665875758656766877756858575476558647788456888443664355376553634546452224246233111223425513
212444251221521163463346456246453476567773685547466674568585555744785454757465754876588888854557547646333767436676226445666246632531531455332
144123524423242466443644666264653336345356858658444866544745586475566986995755868577485586756576458777454647537746623633234666235342545133411
221453311132236264555346533676464376533578645545886656657685646667699788577769677674477455646846444655655443767565753423665463445133353253521
141142154512145435643455236457667346734587484547764647688876858777689879959966578567775578568684567886866376754677464366524256552235155552154
323455551423422426655336555443456534745784656744554756778956695965785957859776559866587446788845755556587543737537544552333655525532544321142
222153112445255342562263345436366555744857668745676748467779668978767998986958656579658646656465544677448566654746453664632362562335241534344
424532531452246466422226447664644456348655578877667666957869677959599878655765756666597756586867845746465563437476575522633344543624143243433
434524412511543234442232754347774447674556487658675858669598788968565877765865579569888886564458448478555677545453445636242246233363532144241
551351315435424456662566675676747657578785485866756668989879679857557767697658697576698756585456857555576747463666767646525433632534134233511
142155334235422453466544356474577644744647667484586967568555965666665886576786878877859888958647555585556846655455336464225352546232555152325
445235552336465564534363645665546376866564546865855589778995856596657595779657969877788568886766875548775786557564663655462652632243243124332
425132411145222655332677563737443677847875764664567665675596988659576865889889656667868585575785665684746475677547536436526445424535424442421
213521412362545253336464574743747656864466574656858578766866887798998867676868579889976958798956574848456557877635533677763346246225612142334
155554542522253244364335577466544746857768454455556695985975669789788686977788969897686866879768757575757867475636444655664524343352622514315
424124454332322435254747657643733676487575467579768858956899989969668769898769766966675686596765895675886554565577356353653643564643562232442
333332233554335254335357337776335484486787866759879665659566898787786686897698698778799569579855585646457677444466643644347523356224335223154
434535131243623462244475677444744844875744849667765669955977789798678698669889989888859876759979567876576475765374575644454633346546522424121
254442512432453246237776473467455675687686755767586599959688799697977897869676689787989788555898656855766584858576643433754525334366431233533
335243313666253235646655447557748676665878458758659985598799766996987898867978769898867597768695756976676468565666775353377332452324632254412
313545213654356634445374765347446866566864785579979678587769787999868788769979786798699678599576668995867457868877475357755634456533446532142
151323322545465224476444745676547488676775869975798798987669778986979677978899676898677767666989785576887565586587353653444526442236463233315
145223234262353633657375655457685866574846555978659986776679898888789677877778978866976668578887558589856457886766644767455463522334246213153
132221342423644536667765453666475485778458785955767797989998888697787869768789699886998899696597578785658775856754753656476756354643646241152
522551125256262325744774763747565687465445688795895977789769778679888888879969968668686768679878669759877446666574545736733544346533532613333
112233336636333636455734767634456675776656588556655799799887688698898778989797997888788768757699658869545655748786456346355472553253256613431
522514466255346525374646747634876655878876587997985967669987779888778779978779989678998777665565665556665557477658447743633535636423564253142
155231333246634426676667456335758456587555958565769997699797696998787888978979877997778778667957686876885754848556565557747533342243633251245
344554533232436256467743456776654588745669679998855987888986787789989779998889899798989967886857756768946745756458463675445665422264242533423
232552563425264325467655667666757864886887868588777769899768989898888987879879778676996978799655989886664475474565836475647474656333235624135
345224123452644245534557354347646465484978668668588689968968988899999899788979777986766999697787668558964458466758633374467436232645646255413
531114452564243453754774437584468886765666775676799777879869877789997788998989889979966967698695675999796774675744845453643556563635424641352
421334533264346553754347756658868784645789987589996967978879997778797977798788799876788976666675996698587744556554746745345647433365244233211
341335126532343433644667673654585877646595779576577786798998988777787887979877978997987766687995958997757865884757776577436677445623353344323
324412525323325454365446777675568586486866877979898788977797898879878798987997997998768779886697567859797475577786454537733445654346366635443
211121132666633255475455564368768477656666586696587678987877798987977798899887878768997876877898989755896458847484673367775637234553562633342
331315433646624527734644654374448476584967989665967899668669697877787988898989788799666776889987789996575784488875873357737346324542562445441
114213565344362645453646467487557866867688589699758696889699777888977999999799788776787676699596879957578456845476733436366744623664254525211
154124124344545434437376737665485484547867566878566668988967797897787897977789977898687696777765687785897558766444546377376537535463553634443
123312146346464464734734546357488447858895799589797879689987979778797789977997787678866977786969595698966667655764647354554572443443533415125
342153264332523242665446353748887855546787599875877689798877888978879798899989989689766976866955676669887468654664443445533653226264366631412
141232453365235242464753743357554448855767785877785777669698666978878779999777897687997699879599867676665567487757663457433754455326465322444
543152524335433642663474557456556887848889666586759866777976898997997989797999869868969969877596676889974575457757475363735634335664455425321
221522553234224556636367565756754475668767755569868968977889977679878779899878676896796677659867799758947568658574475775345755226266664431211
222354426566426462563437353346475547588575758766586699796889988776778999899788888878976967758796559667444884686548336573635634362353463545234
213252543263343252477675776346477655666846895567989766998897679698987976796796697876996986757696696759864547776876743777445472635355464645235
334333436423255666564664464457875488857686868599777768777866998978877676797788988668977688999776998897457455745654556636665656464463552445115
315215242633664663667444367344776557774844798756579889799767997689697676786698896887867765558795675785878455767446636753644533436556432343333
245453345445645554465435376365584774788578687799855755976687996777697666766978689989687865788578577595678575878843654467344565236425552143425
131214135532432523364755666655768665657845777596868666959968979698797966678967899788967867876689566868855864665434664453554564246242235544322
431134151544344535564543455333358564657554767757966699987999698779866967767679866867996585969799865945756574474443357747363353465544442344255
435115434555433446353777755667466556765764588885897599995697989999777766988667799989659769657959795567658485776764445736757222453633642522551
322535244456525456356533555457665778447845845958577667869677869778788896989979968699689885575579776476684764686673675376546253655565435134443
435415331355255552323543453665454775575788454768958668975855897698777866877786986675898959569779964756867746873743577537543346335632425435143
451223122355233643636435646567637666677685847865866757866859698679879887797788766895865558588875978864554476546575747654674253533433241135433
555153431424263343433376633464337687787464475457898876857555958758669797969799998587578688597588857875486747676765573636423223634446433523352
314231155426354663665355573745334557456758668646556969899889585986767879778956598587578787956796855788664646563373746634453544423542243341134
113222321532232236222277355566743477677676458766677557675995889989855698797565599555685968957678747565546756667773377765456332522443322545352
221251315432245355444534644464646748446878476444868955688587668876865958875686859665976678668677475677846888554445377735544553633254231334553
455233232413242522645635655746355567848747647478665599669885957775698678965767956765658656795766768466686583344434553436434365356545235552514
245144435324334564254244445473454437567447845844666575959977888995867656868788596858868866856467777446674647673567377474453252332564244223532
445153334215364632562424655775356637535684848787565789677977596788568885795959666569766667667864758645444346353664334466232664322562454111451
151431413155135365665233353355647763434868655585785475588795795796556876777669996699698665756756567458466775744553766654323226622341451524144
313152433531334555466646444474543564746876586764544874444988878979757558697987769579698666457788864886545767453776477644223535544521334551541
335114441544154526553344437433763743536685554888764445765786589995659569699675968675687468676564748745865574665735755265256253562113143132411
144413342142154624343433566676633545665336688756468668848584449858797898675589765564876665488647866476463557535733633264426453522142125544351
331132153515142362244255253446575545774335584868445475644576547488555696977958576555768654847667584463333563554655652663652266425232425112551
142454333522534432556555655656746643673645445646757647478486686745784585754744665765845486478658758436445355663454625234562534244221554344441
333351122213211563363246332525466737636543537876888486458478848466575584685858766684767655678776785533733757533536242525523253454152143554524
233313155421222544535563442646346336435743646646555565755568475866656566876554475668846868785655573533554776777362355465554233342443222251312
222433425453121243256532253264633555773575477544748558645567457565884675758867675657775786686586744774744757635543664256243463522444424445242
423242521154553145322666225455235465464735537633648588644486884867484477475477885864457785785554546547567653337464526646252455241512545424244
112233331552134351144342565326564353556736547764677778678875747675865688466477847486568657467754577756467537564432645554446441434232324314332
211234515351253351346326662446662343544734575736577565584665475657785758746648486574555564533743765776733346545324225356265412455231525141412
412134125445441535156345623253366236575744347333577534666466766447556547458476858485755655456473657573363345255656526355243251533355212432323
431144323532323151245556335256654535737735477376365574547867575688788547874445756444776467465653663344634674442263344253462142413521532114224
342141332115524452524362324552323536443565347446455653757534565674658767876684468473653644764534763674645565654424524522531453243144131132144
324112223234352143253445645466622245543737735475746365655755673445847775665565677735446366434653643753743223325252443224422415525544433431313
114414432143444443224351443423655525653366736767554654644553663557645744334753474654657474737755755575356444423246542464355133453525341312433
211311231245315214543533533432525446332535533537747747564636466576554655333757475456665334564355353776442346435664265225322455452222413321132
443212341213512214342124115332234455232545455674333547577545445447454365376657554677567445535374434346342632626646565214544415451415213234311
222423341423523431135453143644264225545323555775465747647775375767733346337453675366674775434537742324466364234326623133523441312344413244344
142211312132221521133144255532526355226536554233557567777557375473457643634363456464563763336757453653242462652642514253435543345224332142231
331222441322244323411342224446535623346436352636446356775636636555343746455356454475436765453773345545556254336422425245454542112113343143344
333413422411413325523222443211622645622626456425522576434354565774366736576575736676364754574322533362464635524633534255555221254233331314221
344323214232434413523314533521565544544223263245266355365674544665534464747743375434677776522256344252345533633611454351541541114221331313141
324434433431411221511124235523212563622462342435234262335575557766433356644366637576343452633264624363235446553334515514414531531221222133334
113112334341423325324334524231314366434252425434522462355254477567534737656765674452524434536336345422545546551534551132545541411424124111243
232334134323432112512313311354353454626635555566665345565326262435655676555736643642453554553235323524326624142441133452313512334424234134311
331322334114331331422143242154123552322523642445443235463465466446432565443623666546234643664356522364424652313542434544144334334213421233321
332233344314131232143454332424421222251434423655322552525665564256623342223323654665334323266635334556433554325344213132245321141432132444322
311113141131112443334333344525415351324326242235465322626232553625663323262346334536563635662266323256515325535454431541434444343343234331211
233231232131134113122334233532321222255133326525362455364555355435635456363223542222543266426353263253353542433151252143332221131243341211232
211333323124424432413322224414452535334534543562554526452435243536265436364622344655542325352334422113552343145531511321331331124422413232221
231221313133312421444242222414323434332223354516523224262643224334635554222463532656224326656342132255153152434331415144144421242412133212122
313333233143442142331412414511435424442124455521245633255634546533253663325365265664525624435524431521424545242525423143314132444114432231321
132212231232141324143114221152225412144152423152514155266633423333344565425465342622553644432214315154152113333531143213234441312342333233112
323211122122421423122141444223124423342115332555433254224423334544254556523243363332555545331512145542344352225451132311422243344132312122133
113332112223114334332243122222324342541513351422523224441133342366665464244554666523412432513333555325553223422323312242422344344132123322122
211222132131334232424332321211143315124453244115222231515524233213432213144143444214423354442123342514355531455341344311434441412133333131111
223311313313331223214124441132442133312434124141514113332525252552453321443532135431232332542541431515312415313142412114444431111132122222113
221331111212231223213133312222122123542311313433533333213451534411443225242135432235354233351243353243343132334442423442412142332312123123323
122313313112122311242142233133321412235233415341434432513245152342242534411132525311321153243341341351354233123241411213224341221122222321121
211312211331132211221241421112131144433444152132131222235124242344525131211315411251324414334243451214134433144234432432443423232121323211232`;

export const smallTestData = parseLines(smallTestString);
export const testData = parseLines(testString);
export const data = parseLines(input);