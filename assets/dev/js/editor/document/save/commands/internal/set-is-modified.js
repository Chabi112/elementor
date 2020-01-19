import CommandInternalBase from 'elementor-api/modules/command-internal-base';

export class SetIsModified extends CommandInternalBase {
	validateArgs( args ) {
		this.requireArgumentType( 'status', 'boolean', args );
	}

	apply( args ) {
		const { status, document = elementor.documents.getCurrent() } = args;

		if ( status && document.editor.isSaving ) {
			document.editor.isChangedDuringSave = true;
		}

		// TODO: BC.
		elementor.channels.editor
			.reply( 'status', status )
			.trigger( 'status:change', status );
	}
}

export default SetIsModified;