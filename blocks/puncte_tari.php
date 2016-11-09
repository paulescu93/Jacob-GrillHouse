<div class="row-gree points pct_tari" id="points">
	<div class="overlay">
		<div class="w-container container wrap-normal">
			<div class="center calitatea_oferita">
				<p class="welcome proud only-desktop "><?php echo $this->uri->segment(1) == 'en' ? 'Why Jacob Grillhouse? ' : 'De ce Jacob Grillhouse?' ?></p>
				<p class="welcome proud only_mobile"><?php echo $this->uri->segment(1) == 'en' ? 'Why <br/>Jacob Grillhouse? ' : 'De ce? <br/>Jacob Grillhouse' ?></p>

				<p class="reasons"><?php echo $this->uri->segment(1) == 'en' ? 'Here is why you should come <br/> and visit us:' : 'Iata doar cateva motive pentru care va invitam <br/>sa ne treceti pragul:' ?></p>
			</div>
		</div>
		<div class="w-container container top_points_wrapper">

			<?php foreach ($big_points as $key => $big_point): ?>
				<div class="point_item w-col w-col-4 w_p2 <?php echo $big_point->class; ?>">
					<div class="icon-box forte_box" style="background-image: url('/<?php echo get_option('bigpoint_url').$big_point->image; ?>')">
					</div>
					<div class="title_descript_points">
						<div class="title-number"><?php echo $big_point->priority ?></div>
						<div class="descript"><?php echo $this->uri->segment(1) == 'en' ? $big_point->name_en : $big_point->name ?></div>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</div>
