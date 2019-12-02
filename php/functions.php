add_action('save_post','save_post_callback');
function save_post_callback($post_id){
    $status =  get_post_status( $post_id );
     if ( $status == 'trash' ||  $status == 'publish'  ) {
        buddyCall();
     }


 $js_code = '<script>console.log(`here`);</script>';
    echo $js_code;

}

function buddyCall() {
     $url = ' https://api.buddy.works/workspaces/artezan015/projects/gatsby-starter-default/pipelines/225278/executions'; 
        $body = array(
        'to_revision' => array('revision'=>'HEAD'),
        'comment' => 'API_WP'
        );
        $args = array(
    'method' => 'POST',
    'body' => json_encode($body),
    'headers' => array(
        'Authorization' => 'Bearer xxxxxx',
        'Content-Type' => 'application/json',
            ),
        );
    
            $response = wp_remote_post( $url, $args );
       
            if ( is_wp_error( $response ) ) {
 
              githubCall();
 
            } elseif (wp_remote_retrieve_response_code($response) != '204' && wp_remote_retrieve_response_code($response) != '200' ) {
                githubCall();
            }
       
    
}
function githubCall (){
      $url = 'https://api.github.com/repos/artezan/gatsby-starter-default/dispatches'; 
        $body = array(
        'event_type' => 'CI',
        );
        $args = array(
    'method' => 'POST',
    'body' => json_encode($body),
    'headers' => array(
        'Authorization' => 'token xxxx',
        'Accept' => 'application/vnd.github.everest-preview+json',
        'Content-Type' => 'application/json',
    ),
        );
        $response = wp_remote_post( $url, $args );
}