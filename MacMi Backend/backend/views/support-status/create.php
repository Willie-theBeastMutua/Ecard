<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\SupportStatus */

$this->title = 'Create Support Status';
$this->params['breadcrumbs'][] = ['label' => 'Support Statuses', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<section class="flexbox-container">

	<?= $this->render('_form', [
		'model' => $model,
		'rights' => $rights,
	]) ?>

</section>
