var projectLib = require('/lib/xp/project');
var contextLib = require('/lib/xp/context');
var clusterLib = require('/lib/xp/cluster');

var projectData = {
    id: 'hmdb',
    displayName: 'Headless Demo',
    description: 'Headless Movie DB sample content',
    language: 'en',
    readAccess: {
        public: true
    }
}

var runInContext = function(callback) {
    var result;
    try {
        result = contextLib.run({
            principals: ["role:system.admin"]
        }, callback);
    } catch (e) {
        log.info('Error: ' + e.message);
    }

    return result;
}

var createProject = function() {
    return projectLib.create(projectData);
}

var getProject = function() {
    return projectLib.get({
        id: projectData.id
    });
}

var initialize = function() {

    var project = runInContext(getProject);

    if (!project) {
        log.info('Project "' + projectData.id + '" not found. Creating...');
        project = runInContext(createProject);

        if (project) {
            log.info('Project "' + projectData.id + '" successfully created');
        }
    }

    if (project) {
        createContent();
    } else {
        log.error('Project "' + projectData.id + '" failed to be created');
    }

};

function createContent() {
    var bean = __.newBean('com.enonic.app.hmdb.initializer.CreateContent');
    bean.projectName = projectData.id;
    return __.toNativeObject(bean.execute());
}

if (clusterLib.isMaster()) {
    initialize();
}
